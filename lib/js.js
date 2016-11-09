var fs = require('fs');
var Promise = require('promise');
var _ = require('underscore');
var html = require('./html');

var esprima = require('esprima');

var readFile = Promise.denodeify(fs.readFile);

function parseFile(str,fileName){
    var tokens = esprima.tokenize(str);
    var strings = _.chain(tokens).where({type:'String'}).pluck('value');
    
    var singleValue = strings.map(function(s){
        return s.replace(/['"]/g,'');
    }).filter(function(s){
        return s.indexOf(' ') === -1 && s.length > 1;
    }).map(function(s){
        return s.replace(/^\./,'')
    });

    var htmlString = strings.filter(function(s){
        return s.indexOf('<') >= 0;
    }).map(function(s){
        var parsedHtml =  html(s,fileName);
        return _.chain(parsedHtml).pluck('classes').flatten().value();
    })

    return _.flatten([singleValue.value(),htmlString.value()]);
}

module.exports = parseFile;
