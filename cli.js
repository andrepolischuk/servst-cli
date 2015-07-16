#!/usr/bin/env node

'use strict';

var chalk = require('chalk');
var servst = require('servst');
var http = require('http');
var resolve = require('path').resolve;
var program = require('commander');

program
  .version(require('./package').version)
  .usage('[options] [dir]')
  .option('-p, --port <port>', 'specify port', Number, 3000)
  .parse(process.argv);

var path = resolve(program.args.shift() || '.');
var statics = servst(path);

var server = http.createServer(function(req, res) {
  statics(req, res, function(err) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not found');
      console.log(
        chalk.red('404') +
        chalk.bold(' %s ') +
        'not found',
        err.url
      );
    }
  });
});

server.listen(program.port, function() {
  console.log(
    chalk.blue('Serving') +
    chalk.bold(' %s ') +
    'on port %d',
    path,
    program.port
  );
});
