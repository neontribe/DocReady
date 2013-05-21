/* global d3 */
'use strict';

angular.module('docready')
  .directive('d3cloud', function () {
    // constants
    var opts = {
        width: null,
        height: null,
        font: 'Impact,serif',
        spiral: 'rectangular',
        colorDomain: [0,1,2,3,4],
        colors: ['#07fb07', '#d6fb07', '#fbe107', '#fba207', '#fb2907']
      },
      fill, fontSize;

    return {
      restrict: 'EA',
      scope: {
        words: '=',
        height: '@',
        width: '@',
        options: '=',
        navigate: '='
      },
      link: function(scope, element, attrs) {
        var svg,
          layout;
        opts.width = parseInt(attrs.width, 10) || opts.width;
        opts.height = parseInt(attrs.height, 10) || opts.height;
        angular.extend(opts, scope.options || {});
        fill = d3.scale.linear().clamp(true).domain(opts.colorDomain).range(opts.colors),
        fontSize = d3.scale.linear().clamp(true).domain([0,1,2,3,4]).range([30, 40, 45, 50, 55]);

        // set up initial svg object
        svg = d3.select(element[0])
          .append('svg')
            .attr('width', opts.width || '100%')
            .attr('height', opts.height || '100%');

        function draw(words) {
            svg.selectAll('*').remove();
            svg
              .append('g')
                .attr('transform', 'translate(' + opts.width/2 + ',' + opts.height/2 + ')')
              .selectAll('text')
                .data(words)
              .enter().append('text')
                .on('click', function(d) {
                  if (scope.navigate) {
                    scope.navigate(d.text);
                  }
                })
                .style('font-size', function(d) { return d.size + 'px'; })
                .style('font-family', opts.font)
                .style('fill', function(d) { return fill(d.count); })
                .attr('text-anchor', 'middle')
                .attr('transform', function(d) {
                  return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
                })
                .text(function(d) { return d.text; });
          }

        /*
         * Establish a watch on the word data. Note that we pass true as the last argument to the watcher
         * so that we compare on equality rather than identity. It may be that the words array has been updated in place
         */
        scope.$watch('words', function(newVal){
          if (!opts.width || !opts.height) {
            opts.width = parseInt(svg.style('width'), 10);
            opts.height = parseInt(svg.style('height'), 10);
          }
          layout = d3.layout.cloud()
            .size([opts.width, opts.height])
            .words(angular.copy(newVal))
            .rotate(function() { return Math.floor((Math.random() * 5)) * 30 - 60; })
            .font(opts.font)
            .spiral(opts.spiral)
            .fontSize(function(d) { return fontSize(+d.count); })
            .on('end', draw)
            .start();
        }, true);
      }
    };
  });
