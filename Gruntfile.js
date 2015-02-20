module.exports = function(grunt) {

  grunt.initConfig({

    // Import package manifest
    pkg: grunt.file.readJSON('vide.jquery.json'),

    meta: {
      banner: '/*\n' +
        ' *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n' +
        ' *  <%= pkg.description %>\n' +
        ' *  <%= pkg.homepage %>\n' +
        ' *\n' +
        ' *  Made by <%= pkg.author.name %>\n' +
        ' *  Under <%= pkg.licenses[0].type %> License\n' +
        ' */\n'
    },

    concat: {
      dist: {
        src: 'src/jquery.vide.js',
        dest: 'dist/jquery.vide.js'
      },
      options: {
        banner: '<%= meta.banner %>'
      }
    },

    connect: {
      server: {
        options: {
          port: 7770
        }
      }
    },

    jshint: {
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: 'src/**/*.js'
      },
      test: {
        src: 'test/**/*.js'
      },
      options: {
        jshintrc: '.jshintrc'
      }
    },

    jscs: {
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: 'src/**/*.js'
      },
      test: {
        src: 'test/**/*.js'
      },
      options: {
        preset: 'airbnb',
        safeContextKeyword: null
      }
    },

    qunit: {
      all: {
        options: {
          urls: ['', '2'].map(function(version) {
            return 'http://localhost:<%= connect.server.options.port %>' +
              '/test/vide.html?jquery=' + version;
          })
        }
      }
    },

    uglify: {
      target: {
        src: 'dist/jquery.vide.js',
        dest: 'dist/jquery.vide.min.js'
      },
      options: {
        banner: '<%= meta.banner %>'
      }
    },

    githooks: {
      all: {
        'pre-commit': 'lint'
      },
      options: {
        command: 'node_modules/.bin/grunt'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-githooks');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.registerTask('default', [
    'connect', 'jshint', 'jscs', 'qunit', 'concat', 'uglify', 'githooks'
  ]);
  grunt.registerTask('lint', [
    'jshint', 'jscs'
  ]);
  grunt.registerTask('test', [
    'connect', 'jshint', 'jscs', 'qunit'
  ]);
};
