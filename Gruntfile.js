/*
 * grunt-css-check
 * https://github.com/akselsson/grunt-css-check
 *
 * Copyright (c) 2015 Patrik Akselsson
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                'lib/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Configuration to be run (and then tested).
        css_check: {
            pass: {
                files: {
                    css: ['test/fixtures/css/pass.css'],
                    html: ['test/fixtures/html/pass.html'],
                    js: ['test/fixtures/js/pass.js'],
                },
                options: {
                    checkCss: true,
                    checkHtml: true,
                    ignore: ["external",/external-prefix-.*/]
                }
            },
            fail: {
                files: {
                    css: ['test/fixtures/css/fail.css'],
                    html: ['test/fixtures/html/fail.html'],
                    js: ['test/fixtures/js/fail.js'],
                },
                options: {
                    checkCss: true,
                    checkHtml: true,
                    ignore: ["external",/external-prefix-.*/]
                }
            },
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', [ 'css_check:pass', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
