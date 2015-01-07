'use strict';

var grunt = require('grunt');
var
path = require('path'),
exec = require('child_process').exec,
execOptions = {
    cwd: path.join(__dirname, '..')
}
;

exports.css_check = {
    pass: function(test) {
        test.expect(2);
        exec('grunt css_check:pass',execOptions,function(error, stdout) {
            //grunt.file.write('test/expected/pass',stdout);
            var actual = stdout;
            var expected = grunt.file.read('test/expected/pass');

            test.equal(actual,expected,'should generate correct output');
            test.equal(null,error);
            test.done();

        });

    },
    fail: function(test) {
        test.expect(2);
        exec('grunt css_check:fail',execOptions,function(error, stdout) {
            //grunt.file.write('test/expected/fail',stdout);
            var actual = stdout;
            var expected = grunt.file.read('test/expected/fail');

            test.equal(actual,expected,'should generate correct output');
            test.equal(3,error.code);
            test.done();

        });

    }
};
