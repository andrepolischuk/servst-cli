#!/usr/bin/env node

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
      console.error('\033[91m404 \033[0m%s\033[90m not found\033[0m', err.url);
    }
  });
});

server.listen(program.port, function() {
  console.log('\033[96mServing \033[0m%s\033[90m on port \033[0m%d', path, program.port);
});
