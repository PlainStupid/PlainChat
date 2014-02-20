'use strict';

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-bower-install');

    require('load-grunt-tasks')(grunt);

    require('time-grunt')(grunt);

    grunt.initConfig({

        thisweb: {
            dev: require('./bower.json').appPath || 'app',
            dist: 'dist'
        },

        // JSHint til að athuga hvort js innihaldi villur.
        // .jshintrc inniheldur öll option sem við viljum að jshint fari yfir.
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                '<%= thisweb.dev %>/scripts/{,*/}*.js'
            ]
        },

        // bowerInstall sér um að setja components, s.s. angular scriptu og bootstrap scriptu
        // í index.html skránna.
        bowerInstall: {
            target: {
                src: [
                    '<%= thisweb.dev %>/index.html'
                ]
            }
        }
    });

    grunt.registerTask('default', [
        'jshint',
        'bowerInstall'
    ]);
};
