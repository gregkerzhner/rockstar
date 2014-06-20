module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-ng-constant');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-shell-spawn');
  grunt.loadNpmTasks('grunt-node-inspector');

  var userConfig = require('./build.config.js');
  var taskConfig = {
    pkg: grunt.file.readJSON('package.json'),

    clean: [
      '<%= build_dir %>'
    ],

    copy: {
      app_assets: {
        files: [
          {
            src: [ '**' ],
            dest: '<%= build_dir %>/assets/',
            cwd: 'src/assets',
            expand: true
          }
        ]
      },
      appjs: {
        src: [ '<%= app_files.js %>' ],
        dest: '<%= build_dir %>/',
        cwd: '.',
        expand: true
      },
      vendor_assets: {
        files: [
          {
            src: [ '<%= vendor_files.assets %>' ],
            dest: '<%= build_dir %>/assets/',
            cwd: '.',
            expand: true
          }
        ]
      },
      vendorjs: {
        files: [
          {
            src: [ '<%= vendor_files.js %>' ],
            dest: '<%= build_dir %>/',
            cwd: '.',
            expand: true
          }
        ]
      },
      vendorcss: {
        files: [
          {
            src: [ '<%= vendor_files.css %>' ],
            dest: '<%= build_dir %>',
            cwd: '.',
            expand: true
          }
        ]
      },
      compile_assets: {
        files: [
          {
            src: [ '**' ],
            dest: '<%= compile_dir %>/assets',
            cwd: '<%= build_dir %>/assets',
            expand: true
          }
        ]
      }
    },

    shell: {
      mongo: {
          command: 'mongod'
      }
    },

    /**
     * `grunt concat` concatenates multiple source files into a single file.
     */
    concat: {
      /**
       * The `build_css` target concatenates compiled CSS and vendor CSS
       * together.
       */
      build_css: {
        src: [
          '<%= vendor_files.css %>',
          '<%= recess.build.dest %>'
        ],
        dest: '<%= recess.build.dest %>'
      },
      /**
       * The `compile_js` target is the concatenation of our application source
       * code and all specified vendor source code into a single file.
       */
      compile_js: {
        src: [
          '<%= vendor_files.js %>',

          'module.prefix',
          '<%= build_dir %>/src/**/*.js',
          '<%= html2js.app.dest %>',
          '<%= html2js.common.dest %>',
          '<%= bundle %>',
          'module.suffix'
        ],
        dest: '<%= compile_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.js'
      }
    },

    ngmin: {
      compile: {
        files: [
          {
            src: [ '<%= app_files.js %>', 'bundle.js' ],
            cwd: '<%= build_dir %>',
            dest: '<%= build_dir %>',
            expand: true
          }
        ]
      }
    },

    uglify: {
      compile: {
        options: {
          mangle: true
        },
        files: {
          '<%= concat.compile_js.dest %>': '<%= concat.compile_js.dest %>'
        }
      }
    },

    less: {
      build: {
        src: [ '<%= app_files.less %>' ],
        dest: '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css',
        options: {
          compile: true,
          compress: false,
          noUnderscores: false,
          noIDs: false,
          zeroUnits: false
        },
        files: {
          '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css': '<%= app_files.less %>'
        }
      },
      compile: {
        src: [ '<%= less.build.dest %>' ],
        dest: '<%= less.build.dest %>',
        options: {
          compile: true,
          compress: true,
          noUnderscores: false,
          noIDs: false,
          zeroUnits: false
        },
        files: {
          '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css': '<%= app_files.less %>'
        }
      }
    },

    index: {
      build: {
        dir: '<%= build_dir %>',
        src: [
          '<%= vendor_files.js %>',
          '<%= bundle %>',
          '<%= vendor_files.css %>',
          '<%= build_dir %>/src/**/*.js',
          '<%= html2js.common.dest %>',
          '<%= html2js.app.dest %>',
          '<%= less.build.dest %>'
        ]
      },

      compile: {
        dir: '<%= compile_dir %>',
        src: [
          '<%= concat.compile_js.dest %>',
          '<%= vendor_files.css %>',
          '<%= less.compile.dest %>'
        ]
      }
    },

    watch: {
      options: {
        livereload: true
      },
      jssrc: {
        files: [
          '<%= app_files.js %>'
        ],
        tasks: ['build']
      },

      html: {
        files: [ '<%= app_files.html %>' ],
        tasks: [ 'index:build' ]
      },

      less: {
        files: [ '<%= app_files.styles %>' ],
        tasks: [ 'less:build' ]
      },
      tpls: {
        files: [
          '<%= app_files.atpl %>',
          '<%= app_files.ctpl %>'
        ],
        tasks: [ 'html2js' ]
      },
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['build'],
        options: {
          livereload: false
        }
      },

      modules: {
        files: '<%= app_files.modules %>',
        tasks: ['browserify:build']
      },

      jsunit: {
        files: [
          '<%= app_files.jsunit %>'
        ],
        tasks: [  ],
        options: {
          livereload: false
        }
      }
    },

    nodemon: {
      dev: {
        options: {
          file: 'server/server.js',
          watchedFolders: ['server'],
          nodeArgs: ['--debug']
        }
      }
    },

    shell: {
      mongo: {
          command: 'mongod',
          options: {
              async: true
          }
      }
    },

    'node-inspector': {
      dev: {
        'debug-port': 5857
      }
    },

    concurrent: {
      dev: {
        tasks: ['shell:mongo', 'nodemon:dev', 'watch'],

        options: {
          logConcurrentOutput: true
        }
      }
    },

    html2js: {
      /**
       * These are the templates from `src/app`.
       */
      app: {
        options: {
          base: 'src/app'
        },
        src: [ '<%= app_files.atpl %>' ],
        dest: '<%= build_dir %>/templates-app.js'
      },
      common: {
        options: {
          base: 'src/common'
        },
        src: [ '<%= app_files.ctpl %>' ],
        dest: '<%= build_dir %>/templates-common.js'
      }
    },

    karma: {
      options: {
        configFile: '<%= build_dir %>/karma-unit.js'
      },
      unit: {
        background: true
      },
      continuous: {
        singleRun: true,
        reporters: ['junit']
      }
    },
    karmaconfig: {
      unit: {
        dir: '<%= build_dir %>',
        src: [
          '<%= vendor_files.js %>',
          '<%= html2js.app.dest %>',
          '<%= test_files.js %>'
        ]
      }
    },
    ngconstant: {
      options: {
        // Task-specific options go here.
      },
      build: {
        dest: '<%= build_dir %>/src/app/constants.js',
        name: '<%= pkg.name %>.constants',
        constants: {
          baseApiUrl: 'api/'
        }
      }
    },
    browserify: {
      build: {
        src: ['src/modules/modules.js'],
        dest: '<%= bundle %>',
        options: {
          debug: true,
          aliasMappings: [
            {
              cwd: 'src/modules/',
              src: ['**/*.js', '!**/*.spec.js'],
              dest: 'modules/'
            }
          ]
        }
      },
      compile: {
        src: ['src/modules/modules.js'],
        dest: '<%= bundle %>',
        options: {
          debug: false,
          aliasMappings: [
            {
              cwd: 'src/modules/',
              src: ['**/*.js', '!**/*.spec.js'],
              dest: 'modules/'
            }
          ],
          transform: ['browserify-ngmin', 'uglifyify']
        }
      }
    }
  };


  grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

  grunt.registerTask('default', ['build', 'concurrent']);

  grunt.registerTask('build', [
    'clean', 'browserify:build', 'copy:app_assets', 'copy:vendor_assets',
    'copy:appjs', 'copy:vendorjs','copy:vendorcss', 'less:build', 'html2js', 'index:build', 'karmaconfig'
  ]);

  grunt.registerTask('compile', [
    'browserify:compile', 'less:compile', 'copy:compile_assets', 'ngmin', 'concat:compile_js', //'uglify'
    , 'index:compile'
  ]);

  /**
   * A utility function to get all app JavaScript sources.
   */
  function filterForJS(files) {
    return files.filter(function (file) {
      return file.match(/\.js$/);
    });
  }

  /**
   * A utility function to get all app CSS sources.
   */
  function filterForCSS(files) {
    return files.filter(function (file) {
      return file.match(/\.css$/);
    });
  }

  /**
   * The index.html template includes the stylesheet and javascript sources
   * based on dynamic names calculated in this Gruntfile. This task assembles
   * the list into variables for the template to use and then runs the
   * compilation.
   */
  grunt.registerMultiTask('index', 'Process index.html template', function () {
    var dirRE = new RegExp('^(' + grunt.config('build_dir') + '|' + grunt.config('compile_dir') + ')\/', 'g');
    var jsFiles = filterForJS(this.filesSrc).map(function (file) {
      return file.replace(dirRE, '');
    });
    var cssFiles = filterForCSS(this.filesSrc).map(function (file) {
      return file.replace(dirRE, '');
    });

    grunt.file.copy('src/index.html', this.data.dir + '/index.html', {
      process: function (contents, path) {
        return grunt.template.process(contents, {
          data: {
            scripts: jsFiles,
            styles: cssFiles,
            version: grunt.config('pkg.version')
          }
        });
      }
    });
  });

  grunt.registerMultiTask('karmaconfig', 'Process karma config templates', function () {
    var jsFiles = this.filesSrc.filter(function (file) {
      return file.match(/\.js$/);
    });

    grunt.file.copy('karma/karma-unit.tpl.js', grunt.config('build_dir') + '/karma-unit.js', {
      process: function (contents, path) {
        return grunt.template.process(contents, {
          data: {
            scripts: jsFiles
          }
        });
      }
    });
  });
};