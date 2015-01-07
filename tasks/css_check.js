/*
 * grunt-css-check
 * https://github.com/akselsson/grunt-css-check
 *
 * Copyright (c) 2015 Patrik Akselsson
 * Licensed under the MIT license.
 */

'use strict';

var Checker = require('../lib/checker');
var Logger = require('../lib/grunt-logger');
var css = require('../lib/css');
var html = require('../lib/html');
var js = require('../lib/js');
var _ = require('underscore');

module.exports = function(grunt) {

    function parseFiles(files,parser){
        var allFiles = grunt.file.expand(files);
        var parsed = allFiles.map(function(file){
            var src = grunt.file.read(file);
            return parser(src,file);
        });
        return _.flatten(parsed);
    }

    function parse(files){
        var obj = {};
        files.forEach(function(file){
            switch(file.dest){
                case 'css':
                    obj.css = parseFiles(file.src,css);
                    break;
                case 'html':
                    obj.html = parseFiles(file.src,html);
                    break;
                case 'js':
                    obj.js = parseFiles(file.src,js);
                    break;
                default:
                   grunt.log.warn('Unknown file type: ' + file.dest);
            }
        });
        return obj;
    }

    grunt.registerMultiTask('css_check', 'Checks css and html files for missing classes', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            ignore: [],
            checkCss: true,
            checkHtml: true
        });

        var logger= new Logger(grunt);

        var checker = new Checker({
            logger: logger,
            ignore: options.ignore,
        });

        var config = parse(this.files);
        config.checkCss = options.checkCss;
        config.checkHtml = options.checkHtml;

        checker.check(config);

    });

};
