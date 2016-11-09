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
        test.deepEqual(actual,['class_1']);
        test.done();
    },
    single_string_with_spaces: function(test) {
        test.expect(1);
        var actual = js('var a = \'one two\';','fileName');
        test.deepEqual(actual,[]);
        test.done();
    },
    string_with_html: function(test) {
        test.expect(1);
        var actual = js('html = \'<select class="pika-select pika-select-month" tabindex="-1">\'','fileName');
        test.deepEqual(actual,['pika-select','pika-select-month']);
        test.done();
    },
};
