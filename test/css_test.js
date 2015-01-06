'use strict';

var css = require('../lib/css');

exports.html = {
    single_class: function(test) {
        test.expect(1);
        var actual = css('.class_1 {}','fileName');
        test.deepEqual(actual,[
            { file: 'fileName', line: 1, classes: ['class_1']}
        ]);
        test.done();
    },
    two_classes: function(test) {
        test.expect(1);
        var actual = css('.class_1.class_2 {}','fileName');
        test.deepEqual(actual,[
            { file: 'fileName', line: 1, classes: ['class_1', 'class_2']}
        ]);
        test.done();
    },
    nested_class: function(test) {
        test.expect(1);
        var actual = css('.class_1 .class_2 {}','fileName');
        test.deepEqual(actual,[
            { file: 'fileName', line: 1, classes: ['class_1', 'class_2']}
        ]);
        test.done();
    },
    two_statements: function(test) {
        test.expect(1);
        var actual = css('.class_1 {} \n .class_2 {}','fileName');
        test.deepEqual(actual,[
            { file: 'fileName', line: 1, classes: ['class_1']},
            { file: 'fileName', line: 2, classes: ['class_2']}
        ]);
        test.done();
    },
    class_with_pseudo_selector: function(test) {
        test.expect(1);
        var actual = css('.class_1:before {}','fileName');
        test.deepEqual(actual,[
            { file: 'fileName', line: 1, classes: ['class_1']}
        ]);
        test.done();
    },
};
