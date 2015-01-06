function Logger(grunt){
    this._grunt = grunt;
    this._logged = {};
    this._missingClassCount = 0;
}
module.exports = Logger;

Logger.prototype.missingClass = function(clazz,source){
    this._missingClassCount += 1;
    if(Object.keys(this._logged).length == 0){
        this._grunt.log.error('Classes that only exists in one file:');
    }
    if(this._logged[clazz]){
        return;
    }
    if(this._lastFile !== source.file){
        this._grunt.log.error(source.file + ':');
        this._lastFile = source.file;
    }
    this._grunt.log.error('\t' + clazz); 
    this._logged[clazz] = source;
};

Logger.prototype.end = function() {
    if(this._missingClassCount === 0){
        return;
    }
    this._grunt.log.writeln();
    this._grunt.log.writeln('--------------------------------------------------------------------------------');

    this._grunt.log.writeln('Summary:')
    this._grunt.log.writeln(Object.keys(this._logged).length + ' missing classes in ' + this._missingClassCount + ' locations');
    this._grunt.log.writeln();
    this._grunt.log.writeln('If the classes are genereated dynamically, add this to your ignore list:')
    this._grunt.log.writeln(Object.keys(this._logged));
};
