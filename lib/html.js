var fs = require('fs');
var Promise = require('promise');
var htmlparser = require("htmlparser2");
var _ = require('underscore');

var readFile = Promise.denodeify(fs.readFile);

function extractClasses(value){
    var values = [],
        tokens = value.split(' ');
    for (var i = 0, l = tokens.length; i < l; i ++) {
        var token = tokens[i];
        if(token.indexOf('@') === -1){
            values.push(token);
        }
        else if(token.indexOf('(') !== -1){
            //String contains a complex razor statement, bail out
            return values;
        }
        else{
            //String is a simple razor statement, continue
        }
    }
    return values;
}


function parse(html,fileName){
    var classes = [];
    var parser = new htmlparser.Parser({
        onattribute: function(name,content){
            if(name === 'class'){
                classes.push(extractClasses(content));
            }
        },
    },{
        xmlMode: true
    });
    parser.write(html);
    parser.end();
    return [{
        file: fileName,
        classes: _.flatten(classes)
    }];
}

module.exports = parse;

