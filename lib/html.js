var fs = require('fs');
var Promise = require('promise');
var htmlparser = require("htmlparser2");
var _ = require('underscore');

var readFile = Promise.denodeify(fs.readFile);


function parse(html,fileName){
    var classes = [];
    var parser = new htmlparser.Parser({
        onattribute: function(name,content){
            if(name === 'class'){
                classes.push(content.split(' '));
            }
        }
    });
    parser.write(html);
    parser.end();
    return [{
        file: fileName,
        classes: _.flatten(classes)
    }];
}

module.exports = parse;

