var Promise = require('promise');
function Checker(opts){
    this._logger = opts.logger;
    this._ignored = opts.ignore || [];
}
module.exports = Checker;

Checker.prototype.check = function(cssClasses,htmlClasses,jsClasses){
    this._ignore(jsClasses);

    this._check(cssClasses,htmlClasses);
    this._check(htmlClasses,cssClasses);

    this._logger.end();
}

Checker.prototype._ignore = function(list) {
    for (var i = 0, l = list.length; i < l; i ++) {
        this._ignored.push(list[i]);
    }
};

Checker.prototype._check = function(source,arr){
    var map = {};
    for(var i=0,l=source.length; i<l; i++){
        for(var j=0,ll=source[i].classes.length;j<ll;j++){
            map[source[i].classes[j]] = source[i];
        }
    }
    for(var i=0,l=arr.length; i<l;i++){
        for (var j = 0, ll = arr[i].classes.length; j < ll; j ++) {
            var c = arr[i].classes[j];
            if(!this._exists(map,c)){
                this._logger.missingClass(c,arr[i]);
            }
        }
    }

}

Checker.prototype._exists = function(map,clazz){
    if(map[clazz]){
        return true;
    }
    for (var i = 0, l = this._ignored.length; i < l; i ++) {
        var ignorePattern = this._ignored[i];
        if(ignorePattern.test && ignorePattern.test(clazz)){
            return true;
        }
        else if(ignorePattern === clazz){
            return true;
        }
    }
    return false;
}
