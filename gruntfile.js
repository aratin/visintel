'use strict()';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  // Project configuration.
  grunt.initConfig({


    pkg: grunt.file.readJSON('package.json'),

    express: {
      options: {
        port: 4445
      },
      dev: {
        options: {
          script: 'keystone.js',
          debug: true
        }
      }
    },

    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        force: true
      },
      all: [ 'routes/**/*.js',
             'models/**/*.js',
             './*.js'
      ],
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'keystone.js',
        dest: 'keystone.min.js'
      }
    },

    watch: {
      js: {
        files: [
          'model/**/*.js',
          'routes/**/*.js',
          './*.js'
        ],

        tasks: ['jshint'],

        options: {
          livereload: true
        }
      },
      livereload: {
        files: [
          'public/styles/**/*.css',
          'public/styles/**/*.less',
          'templates/**/*.jade',
          'node_modules/keystone/templates/**/*.jade'
        ],
        options: {
          livereload: true
        }
      }
    }
  });

  // Load the plugins


  grunt.registerTask('serve', function(target){
    grunt.task.run([
      'jshint',
      'express:dev',
      'watch'
    ]);
  });

};
