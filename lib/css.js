var fs = require('fs');
var css = require('css');
var Promise = require('promise');
var _ = require('underscore');

var readFile = Promise.denodeify(fs.readFile);


function classes(str,fileName){
    return parseCss(str,fileName);
}

function parseCss(str,fileName){
    var parsed = css.parse(str,{source: fileName});
    var stylesheet = parsed.stylesheet;
    var rules = stylesheet.rules.map(function(r){
        if(!r.selectors){
            return null;
        }
        var classNames =  r.selectors.map(function(s){
            var re = /\.([\w-]*)/g,
            c = [],
            match;
            while((match = re.exec(s)) != null){
                c.push(match[1]);
            }
            return c;
        });
        var source = r.position.source;
        var line = r.position.start.line;
        return {
            file: source,
            line: line,
            classes: _.flatten(classNames)
        };
    });
    return _.compact(rules);
}

module.exports = classes;





