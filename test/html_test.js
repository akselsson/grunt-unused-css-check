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
    include_script_templates: function(test) {
        test.expect(1);
        var actual = html('<script type="text/template"><div class="script_class"/></script>','fileName');
        test.deepEqual(actual,[
            { file: 'fileName', classes: ['script_class']}
        ]);
        test.done();
    },
    ignore_simple_razor_statements: function(test) {
        test.expect(1);
        var actual = html('<div class="class_1 @razor_class class_2"/>','fileName');
        test.deepEqual(actual,[
            { file: 'fileName', classes: ['class_1', 'class_2']}
        ]);
        test.done();
    },
    bail_out_on_complex_razor_statements: function(test) {
        test.expect(1);
        var actual = html('<div class="class_1 @ifTrue( a == b, "class_a", "class_b" ) ignored_class"><div class="class_2"/></div>','fileName');
        test.deepEqual(actual,[
            { file: 'fileName', classes: ['class_1', 'class_2']}
        ]);
        test.done();
    },
};
