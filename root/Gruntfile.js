/*global module:false*/
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);
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
    watch: {
      options:{
        livereload:true
      },
      css:{
        files:[''],
        tasks:['compass']
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
  grunt.registerTask('default', ['watch' {%= min_concat ? ",'concat', 'uglify'" : "" %}]);
};
