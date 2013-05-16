/* global d3 */
'use strict';

angular.module('docready')
  .directive('d3cloud', function () {
    // constants
    var opts = {
        width: 300,
        height: 300,
        font: 'Impact,serif'
      },
      fill = d3.scale.category20(),
      fontSize = d3.scale.threshold().domain([1,2,3,4]).range([30, 40, 45, 50, 55]);

    return {
      restrict: 'EA',
      scope: {
        words: '=',
        height: '@',
        width: '@',
        font: '@',
        navigate: '='
      },
      link: function(scope, element, attrs) {
        var svg,
          layout;
        opts.width = parseInt(attrs.width, 10) || opts.width;
        opts.height = parseInt(attrs.height, 10) || opts.height;
        opts.font = attrs.font || opts.font;

        // set up initial svg object
        svg = d3.select(element[0])
          .append('svg')
            .attr('width', opts.width)
            .attr('height', opts.height);

        function draw(words) {
            svg.selectAll('*').remove();
            svg
              .append('g')
                .attr('transform', 'translate(' + opts.width/2 + ',' + opts.height/2 + ')')
              .selectAll('text')
                .data(words)
              .enter().append('text')
                .on("click", function(d) {
                  if (scope.navigate) {
                    console.log(d.text);
                    console.log(scope.navigate);
                    scope.navigate(d.text);
                  }
                })
                .style('font-size', function(d) { ;return d.size + 'px'; })
                .style('font-family', opts.font)
                .style('fill', function(d, i) { return fill(i); })
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
        scope.$watch('words', function(newVal, oldVal){
          layout = d3.layout.cloud()
            .size([opts.width, opts.height])
            .words(newVal)
            .rotate(function() { return ~~(Math.random() * 2) * 90; })
            .font(opts.font)
            .fontSize(function(d) { return fontSize(+d.count); })
            .on('end', draw)
            .start();
        }, true);
      }
    };
  });
