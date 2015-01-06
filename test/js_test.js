'use strict';

var js = require('../lib/js');

exports.html = {
    single_string_with_class: function(test) {
        test.expect(1);
        var actual = js('var a = \'.class_1\';','fileName');
        test.deepEqual(actual,['class_1']);
        test.done();
    },
    single_string_without_class: function(test) {
        test.expect(1);
        var actual = js('var a = \'class_1\';','fileName');
        test.deepEqual(actual,[]);
        test.done();
    },
};
