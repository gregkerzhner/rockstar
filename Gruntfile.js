module.exports = function(grunt) {
  var buildConfig = require('./build-config.js');

  var taskConfig = {
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      compileJs: {
        src: buildConfig.jsFiles,
        dest: 'public/rockstar/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'public/<%= pkg.name %>.min.js': ['<%= concat.compileJs.dest %>']
        }
      }
    },
    less: {
      development: {
        files: {
          "public/rockstar/styles.css": "styles/main.less"
        }
      }
    },
    html2js: {
      main: {
        src: ['src/**/*.tpl.html'],
        dest: 'tmp/templates.js'
      },
    },
    watch: {
      template: {
        files: ['src/index.html.tpl'],
        tasks: ['template:development']
      },

      jssrc: {
        files: buildConfig.jsFiles,
        tasks: ['concat']
      },
      less: {
        files: [ 'styles/*.less' ],
        tasks: [ 'less' ]
      },
      html2js: {
        files: ['src/**/*.tpl.html'],
        tasks: ['html2js']
      }
    },
    ngconstant: {
    // Options for all targets
      options: {
        space: '  ',
        wrap: '"use strict";\n\n {%= __ngModule %}',
        name: 'config',
      },
      // Environment targets
      development: {
        options: {
          dest: 'src/config.js'
        },
        constants: {
          ENV: {
            name: 'development',
            api: 'http://localhost:3000'
          }
        }
      },
      production: {
        options: {
          dest: 'src/config.js'
        },
        constants: {
          ENV: {
            name: 'production',
            apiEndpoint: 'http://api.livesite.com'
          }
        }
      }
    },
    template: {
      development: {
        'options': {
          'data': {
            'stylesheet': "rockstar/styles.css",
            'javascript':'rockstar/rockstar.js'
          }
        },
        'files': {
            'public/index.html': ['src/index.html.tpl']
        }
      },
      production: {
        'options': {
          'data': {
            'stylesheet': "/production/styles.css",
            'javascript':'/ama-lab-frontend/ama-lab-frontend.js' 
          }
        },
        'files': {
            'public/index.html': ['src/index.html.tpl']
        }
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
    shell: {
      mongo: {
        command: 'mongod',
        options: {
          async: true
        }
      }
    },
    nodemon: {
      dev: {
        script: 'server/server.js',
        options: {
          watch: ['server']
        }
      }
    }

  };


  grunt.initConfig(grunt.util._.extend(taskConfig, buildConfig));

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-ng-constant');
  grunt.loadNpmTasks('grunt-template');  
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-shell-spawn');
  grunt.loadNpmTasks('grunt-node-inspector');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.registerTask('default', ['template:development', 'ngconstant:development', 'concat', 'concurrent:dev']);


};