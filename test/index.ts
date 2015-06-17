/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/request/request.d.ts"/>
/// <reference path="./typings/mocha/mocha.d.ts"/>

var spawn = require('child_process').spawn;
var request = require('request');

type Callback = (err?: Error) => void;

describe('Minimal', function(){
  it('starts the server', function(done: Callback) {
    var server = spawn('node minimal/server.js');

    request.get('localhost:3000', function(response) {

    });
  });
});
