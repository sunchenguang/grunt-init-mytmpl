/*global module:false*/
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);
  require('grunt-postcss')(grunt);
  // Project configuration.
  grunt.initConfig({{% if (min_concat) { %}
    // Metadata.{% if (package_json) { %}
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '*/\n',{% } else { %}
    meta: {
      version: '0.1.0'
    },
    banner: '/*! PROJECT_NAME - v<%= meta.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '*/\n',{% } } %}
    // Task configuration.{% if (min_concat) { %}
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: [''],
        dest: ''
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '',
        dest: ''
      }
    },{% } %}
    jshint: {
      options: {
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },
    compass:{
      files:{
        options:{
          config:'config.rb'
        }
      }
    },
    sass:{
      dist:{
        options:{
          style:'expanded'
        },
        files:{
          '':'',
          '':''
        }
      }
    },
    postcss:{
      options:{
        map:true,
        processors:[
          require('autoprefixer-core')({
            browsers:['last 2 versions']
          })
        ]
      },
      dist:{
        src:''
      }
    },
    browserSync:{
      dev:{
        bsFiles:{
          src:'*'
        },
        options:{
          watchTask:true,
          server:'./'
        }
      }
    },
    watch: {
      css:{
        files:[''],
        tasks:['sass']
      },
      js:{
        files:[''],
        tasks:['']
      },
      html:{
        files:['index.html'],
        tasks:['']
      }
    }
  });
 // Default task.
  grunt.registerTask('default', ['browserSync','watch']);
  grunt.registerTask('online', [{%= min_concat ? "'concat', 'uglify'" : "" %}]);
};
