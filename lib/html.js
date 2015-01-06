var fs = require('fs');
var Promise = require('promise');
var htmlparser = require("htmlparser2");
var _ = require('underscore');

var readFile = Promise.denodeify(fs.readFile);

function extractClasses(value){
    return _.chain(value.split(' ')).filter(function (val){
        return val.indexOf('@') === -1;
    }).value();

}


function parse(html,fileName){
    var classes = [];
    var parser = new htmlparser.Parser({
        onattribute: function(name,content){
            if(name === 'class'){
                classes.push(extractClasses(content));
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

