'use strict';

// Live Reload
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {

  // Load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var path = require('path');

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    watch: {
      options: {
        livereload: true,
        interrupt: true,
      },
      sass: {
        files: ['styles/**/*.scss'],
        tasks: ['sass']
      },
      js : {
        files: ['js/**/*.js', 'index.html'],
        tasks: []
      },
    },

    connect: {
      options: {
        port: 9090,
        hostname: '0.0.0.0' // change this to '0.0.0.0' to access the server from outside
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              require('connect-livereload')(), // <--- here
              mountFolder(connect, './')
            ];
          }
        }
      },
    },

    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>/'
      }
    },
    
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'styles/main.css' : 'styles/main.scss'
        }
      }
    },

  });

  grunt.registerTask('serve', function (target) {
    grunt.task.run([
      'sass',
      'connect:livereload',
      'open',
      'watch',
    ]);
  });

  grunt.registerTask('default', [
    'serve'
  ]);

};