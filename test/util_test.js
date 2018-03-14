'use strict';

var util = require('../lib/util.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['createGUID'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'createGUID': function(test) {
    test.expect(1);
    // tests here
    test.ok(!!util.createGUID(), '验证生成唯一ID的帮助函数。');
    test.done();
  },
};
