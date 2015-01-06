'use strict';

var html = require('../lib/html');

exports.html = {
    single_class: function(test) {
        test.expect(1);
        var actual = html('<div class="class_1"/>','fileName');
        test.deepEqual(actual,[
            { file: 'fileName', classes: ['class_1']}
        ]);
        test.done();
    },
    two_classes: function(test) {
        test.expect(1);
        var actual = html('<div class="class_1 class_2"/>','fileName');
        test.deepEqual(actual,[
            { file: 'fileName', classes: ['class_1', 'class_2']}
        ]);
        test.done();
    },
    two_elements: function(test) {
        test.expect(1);
        var actual = html('<div class="class_1"><div class="class_2"/></div>','fileName');
        test.deepEqual(actual,[
            { file: 'fileName', classes: ['class_1', 'class_2']}
        ]);
        test.done();
    },
};
