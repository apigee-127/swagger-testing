/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/request/request.d.ts"/>
/// <reference path="./typings/mocha/mocha.d.ts"/>

var rewire = require('rewire');
var request = require('request');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");
var chai = require('chai');

chai.use(sinonChai);
var expect = chai.expect;

var swaggerTesting = rewire('../src/index.js');

var getSpy = sinon.spy();

swaggerTesting.__set__({
  request: {
    get: getSpy
  }
})

type Callback = (err?: Error) => void;

describe('Minimal', function() {
  var swaggerSpec = require('./swaggers/minimal.json');

  swaggerTesting(swaggerSpec);

  before(function(done: Callback) {
    sinon
      .stub(request, 'get')
      .yields(null, null, 'Hello, World!');
    done();
  });

  after(function(done: Callback) {
    request.get.restore();
    done();
  });

  describe('Basic GET calls', function() {
    it('Makes a GET call to "/" path', function() {
      expect(getSpy).to.have.been.calledWith('http://localhost:3000/');
    });
  });
});
