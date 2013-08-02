/* jshint -W106 */
'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist',
    test: 'test'
  };

  try {
    yeomanConfig.app = require('./component.json').appPath || yeomanConfig.app;
  } catch (e) {}

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      less: {
        files: ['{.tmp,<%= yeoman.app %>}/styles/{,*/}*.less'],
        tasks: ['less']
      },
      livereload: {
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        tasks: ['livereload']
      }
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.app),
              mountFolder(connect, '.')
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js'
      ]
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      },
      e2e: {
        configFile: 'karma-e2e.conf.js',
        singleRun: true
      }
    },
    concat: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '.tmp/scripts/{,*/}*.js',
            '<%= yeoman.app %>/scripts/{,*/}*.js'
          ]
        }
      }
    },
    useminPrepare: {
      html: ['<%= yeoman.app %>/index.html', '<%= yeoman.app %>/generator.html'],
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css', '<%= yeoman.dist %>/images/icons/*.css'],
      options: {
        basedir: '<%= yeoman.dist %>',
        dirs: ['<%= yeoman.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    grunticon: {
      icons: {
        options: {
          src: '<%= yeoman.app %>/images/src/icons/',
          dest: '<%= yeoman.app %>/images/icons/',
          defaultWidth: '80px',
          defaultHeight: '80px'
        }
      }
    },
    image_resize: {
      options: {
        overwrite: true
      },
      icons: {
        options: {
          width: 80,
          height: 80
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.app %>',
          src: [
            'images/icons/png/*.png'
          ]
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/styles/docready.css': [
            '.tmp/styles/{,*/}*.css',
            '<%= yeoman.app %>/styles/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['*.html', 'views/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/scripts',
          src: '*.js',
          dest: '<%= yeoman.dist %>/scripts'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '<%= yeoman.dist %>/scripts/scripts.js'
          ],
          '<%= yeoman.dist %>/scripts/drgenerator.js': [
            '<%= yeoman.dist %>/scripts/drgenerator.js'
          ],
          '<%= yeoman.dist %>/docready.js': [
            '<%= yeoman.dist %>/docready.js'
          ]
        }
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}'
          ]
        }
      }
    },
    less: {
      app: {
        options: {
          paths: ['<%= yeoman.app %>/styles']
        },
        files: {
          '<%= yeoman.app %>/styles/main.css': '<%= yeoman.app %>/styles/main.less',
          '<%= yeoman.app %>/styles/generator.css': '<%= yeoman.app %>/styles/generator.less',
          '<%= yeoman.app %>/styles/animations.css': '<%= yeoman.app %>/styles/animations.less'
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'docready.js',
            'components/**/*',
            'images/{,*/}*.{gif,webp,svg}',
            'images/icons/{,*/}*.{css,png,svg}',
            'styles/*.{eot,svg,ttf,woff}'
          ]
        }]
      },
      pdf_css: {
        src: '<%= yeoman.app %>/styles/main.css',
        dest: '<%= yeoman.dist %>/styles/pdf.css'
      },
      overwrite_png_icons: {
        src: '<%= yeoman.app %>/images/icons/png/*.png',
        dest: '<%= yeoman.dist %>/images/icons/png/'
      }
    },
    release: {
      options: {
        bump: true, //default: true
        files: 'package.json', //default: package.json
        add: true, //default: true
        commit: true, //default: true
        tag: true, //default: true
        push: true, //default: true
        pushTags: true, //default: true
        npm: false, //default: true
        //folder: 'folder/to/publish/to/npm' //default project root
        //tagName: 'some-tag-<%= version %>', //default: '<%= version %>'
        //commitMessage: 'check out my release <%= version %>', //default: 'release <%= version %>'
        //tagMessage: 'tagging version <%= version %>' //default: 'Version <%= version %>'
      }
    },
    devcode: {
      options: {
        html: true,        // html files parsing?
        js: false,          // javascript files parsing?
        css: false,         // css files parsing?
        clean: true,       // removes devcode comments even if code was not removed
        block: {
          open: 'devcode', // with this string we open a block of code
          close: 'enddevcode' // with this string we close a block of code
        },
        dest: 'dist'       // default destination which overwrites environment variable
      },
      dist: {             // settings for task used with 'devcode:dist'
        options: {
            source: 'dist/',
            dest: 'dist/',
            env: 'production'
          }
        }
      }
    });

  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('server', [
    'clean:server',
    'livereload-start',
    'connect:livereload',
    'open',
    'watch'
  ]);

  grunt.registerTask('test', [
    'clean:server',
    'jshint',
    'connect:test',
    'karma:unit'
  ]);

  grunt.registerTask('e2e', [
    'clean:server',
    'connect:test',
    'karma:e2e'
  ]);

  grunt.registerTask('lesscompile', ['less:app']);

  grunt.registerTask('icons', ['grunticon:icons', 'copy:overwrite_png_icons']);

  grunt.registerTask('build', [
    'clean:dist',
    'lesscompile',
    'jshint',
    'icons',
    'test',
    'useminPrepare',
    'imagemin',
    'cssmin',
    'htmlmin',
    'concat',
    'copy',
    'ngmin',
    'uglify',
    'rev',
    'usemin',
    'devcode:dist',
    'copy:pdf_css'
  ]);

  grunt.registerTask('default', ['build']);
};
