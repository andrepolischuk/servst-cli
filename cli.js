#!/usr/bin/env node

'use strict';

var chalk = require('chalk');
var http = require('http');
var meow = require('meow');
var resolve = require('path').resolve;
var servst = require('servst');

var cli = meow({
  help: [
    'Usage',
    '  servst [dir]',
    '',
    'Examples',
    '  servst',
    '  servst ./static',
    '  servst --port 3100',
    '',
    'Options',
    '  -p, --port <port>  specify port'
  ]
}, {
  number: [
    'port'
  ],
  alias: {
    p: 'port'
  },
  default: {
    port: 3000
  }
});

var path = resolve(cli.input.shift() || '.');
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

server.listen(cli.flags.port, function() {
  console.log(
    chalk.blue('Serving') +
    chalk.bold(' %s ') +
    'on port %d',
    path,
    cli.flags.port
  );
});
