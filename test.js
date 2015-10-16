'use strict';
var test = require('ava');
var exec = require('child_process').exec;

test('should return version', function (t) {
  t.plan(2);

  exec('node cli.js --version', {cwd: __dirname}, function (err, stdout) {
    t.ifError(err);
    t.true(stdout.trim().length > 0);
  });
});
