var fs = require('fs');
var Promise = require('promise');
var _ = require('underscore');

var esprima = require('esprima');

var readFile = Promise.denodeify(fs.readFile);

function parseFile(str){
    var tokens = esprima.tokenize(str);
    var val = _.chain(tokens).where({type:'String'}).pluck('value').map(function(s){
        return s.replace(/['"]/g,'');
    }).filter(function(s){
        return s.indexOf('.') === 0 && s.length > 1;
    }).map(function(s){
        return s.substring(1);
    });
    return val.value();
}

module.exports = parseFile;
