/* jshint -W106 */
'use strict';

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filter('grunt-*').forEach(grunt.loadNpmTasks);

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
      html: ['<%= yeoman.app %>/index.html'],
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },

    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      //css: ['<%= yeoman.dist %>/styles/{,*/}*.css', '<%= yeoman.dist %>/images/icons/*.css'],
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
      target: {
        files: {
          '<%= yeoman.dist %>/styles/main.css': [
            '<%= yeoman.app %>/styles/main.css'
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
      options: {
        mangle: false
      },
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '<%= yeoman.dist %>/scripts/scripts.js'
          ],
          '<%= yeoman.dist %>/docready.js': [
            '<%= yeoman.dist %>/docready.js'
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
          '<%= yeoman.app %>/styles/main.css': '<%= yeoman.app %>/styles/main.less'
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

    json_wrapper: {
      content: {
        options: {
          raw: true,
          wrapper: 'angular.module(\'docready\').value(\'{filePrefix}_content\', {content});',
          minify: false
        },
        files: {
          '<%= yeoman.app %>/data/content.js': ['data/symptoms.json', 'data/advice.json', 'data/advice_topics.json']
        }
      },
      config: {
        options: {
          raw: true,
          wrapper: 'angular.module(\'docready\').constant(\'custom_config\', {content});',
          minify: false
        },
        files: {
          '<%= yeoman.app %>/data/config.js': ['data/config.json']
        }
      }
    }
  });

  grunt.registerTask('lesscompile', ['less:app']);

  grunt.registerTask('icons', ['copy:overwrite_png_icons']);

  grunt.registerTask('build', [
    'clean:dist',
    'json_wrapper',
    'lesscompile',
    'jshint',
    'icons',
<<<<<<< HEAD
=======
    'test',
>>>>>>> 9da25df... up-to-date doc:36
    'useminPrepare',
    'imagemin',
    'cssmin',
    'htmlmin',
    'concat',
    'copy',
    'ngmin',
    'uglify',
    'usemin',
    'copy:pdf_css'
  ]);

  grunt.registerTask('default', ['build']);
};
