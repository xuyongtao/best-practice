module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    // grunt-contrib-jshint 语法检查工具
    watch: {
      options: {
        dateFormat: function(time) {
          grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
          grunt.log.writeln('Waiting for more changes...');
        },
        livereload: true,
        event: ['changed', 'added', 'deleted']
      },


      // 模板编译部分
      compileTpl: {
        files: ['company/**/*.handlebars', 'company/**/*.json', 'company/**/*.html', 'sites/**/*.handlebars', 'sites/**/*.json', 'sites/**/*.html'],
        tasks: ['clean', 'compile-handlebars', 'exec:fisRelease']
      },

      // less 编译部分
      compileLessHy: {
        files: ['company/**/*.less'],
        tasks: ['clean', 'less:compileHy', 'exec:fisRelease']
      },
      compileLessSites: {
        files: ['sites/**/*.less'],
        tasks: ['clean', 'less:compileSites', 'exec:fisRelease']
      },
      compileLessSeaModules: {
        files: ['sea-modules/**/*.less'],
        task: ['clean', 'less:compileSeaModules', 'exec:fisRelease']
      },
      compileLessTmp: {
        files: ['tmp/**/*.less'],
        tasks: ['clean', 'less:compileTmp', 'exec:fisRelease']
      },


      // js build 部分
      jsBuildHyJavascript: {
        files: ['company/javascript/**/*.js'],
        tasks: ['clean', 'transport:companyJavascript', 'exec:fisRelease']
      },
      jsBuildHyWidgets: {
        files: ['company/widgets/**/*.js'],
        tasks: ['clean', 'transport:companyWidgets', 'exec:fisRelease']
      },
      jsBuildSites: {
        files: ['company/widgets/**/*.js'],
        tasks: ['clean', 'transport:sites', 'transport:sitesConcated', 'exec:fisRelease']
      }
      
    },

    exec: {
      fisRelease: {
        cmd: 'fis release --domains --pack --dest local'
      },
      fisReleaseAndPush: {
        cmd: 'fis release --domains --pack --dest local,remote'
      },
      fisPush: {
        cmd: 'fis release --domains --pack --dest remote'
      }
    },


    // test grunt-compile-handlebars
    'compile-handlebars': {
      globbedTemplateAndOutput: {
        template: 'company/**/*.handlebars',
        templateData: 'company/**/*.json',
        output: 'company/**/*.html'
      }
    },



    // LESS 编译模块
    // 在less文件所在目录旁生成同名的css文件
    // trigger timming: 每次保存的时候触发
    less: {
      options: {
        paths: ["."],
        // yuicompress: true,
        compress: true
      },
      compileHy: {
        files: [{
          cwd: 'company/',
          expand: true,
          src: '**/*.less',
          filter: 'isFile',
          dest: 'company/',
          ext: '.css'
        }]
      },
      compileSeaModules: {
        files: [{
          cwd: 'sea-modules/',
          expand: true,
          src: '**/*.less',
          filter: 'isFile',
          dest: 'sea-modules/',
          ext: '.css'
        }]
      },
      compileSites: {
        files: [{
          cwd: 'sites/',
          expand: true,
          src: '**/*.less',
          filter: 'isFile',
          dest: 'sites/',
          ext: '.css'
        }]
      },
      compileTmp: {
        files: [{
          cwd: 'tmp/',
          expand: true,
          src: '**/*.less',
          filter: 'isFile',
          dest: 'tmp/',
          ext: '.css'
        }]
      }
    },

    transport: {
      options: {
        // paths: ['.', 'sea-modules'],
        alias: '<%= pkg.spm.alias %>'
      },
      companyJavascript: {
        options: {
          idleading: 'company/'
        },
        files: [{
          expand: true,
          cwd: 'company',
          src: 'javascript/**/*.js',
          filter: 'isFile',
          dest: 'sea-modules/company'
        }]
      },
      companyWidgets: {
        options: {
          idleading: 'company/'
        },
        files: [{
          expand: true,
          cwd: 'company',
          src: 'widgets/**/*.js',
          filter: 'isFile',
          dest: 'sea-modules/company'
        }]
      }, 
      sites: {
        options: {
          idleading: 'company/sites/'
        },
        files: [{
          expand: true,
          cwd: 'sites',
          src: '**/*.js',
          filter: 'isFile',
          dest: 'sea-modules/company/sites'
        }]
      },
      sitesConcated: {
        options: {
          idleading: 'company/sites-concated/'
        },
        files: [{
          expand: true,
          cwd: 'sites',
          src: '**/*.js',
          filter: 'isFile',
          dest: 'sea-modules/company/sites-concated'
        }]
      }
    },
    // concat-all sites 的 js - 每次保存的时候都运行
    concat: {
      sites: {
        options: {
          include: 'all'
        },
        files: [{
          expand: true,
          cwd: 'sea-modules/company/sites-concated',
          src: ['**/*.js'],
          dest: 'sea-modules/company/sites-concated/',
          ext: '.js'
        }]
      }
    },
    uglify: {
      all: {
        files: [{
          expand: true,
          cwd: 'sea-modules/',
          src: ['company/**/*.js', '!company/**/*-debug.js'],
          dest: 'sea-modules/',
          ext: '.js'
        }]
      }
    },
    clean: {
      spm: ['.build', 'static', 'product']
    }
  });

  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-cmd-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-compile-handlebars');
  grunt.loadNpmTasks('grunt-exec');


  grunt.registerTask('build-all', ['clean' ,'less', 'compile-handlebars', 'transport:companyJavascript', 'transport:companyWidgets', 'transport:sites', 'transport:sitesConcated', 'concat:sites', 'uglify:all', 'exec:fisRelease']);

  grunt.registerTask('build-all-push', ['clean' ,'less', 'compile-handlebars', 'transport:companyJavascript', 'transport:companyWidgets', 'transport:sites', 'transport:sitesConcated', 'concat:sites', 'uglify:all', 'exec:fisReleaseAndPush']);


  grunt.registerTask('build-all-push', ['clean' ,'less', 'compile-handlebars', 'transport:companyJavascript', 'transport:companyWidgets', 'transport:sites', 'transport:sitesConcated', 'concat:sites', 'uglify:all', 'exec:fisReleaseAndPush']);
  

  grunt.registerTask('fis-build', ['clean', 'exec:fisRelease']);
  
  grunt.registerTask('build-less', ['less']);



};



