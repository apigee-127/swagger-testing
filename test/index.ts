/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/request/request.d.ts"/>
/// <reference path="../typings/mocha/mocha.d.ts"/>

var rewire = require('rewire');
var request = require('request');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");
var chai = require('chai');

chai.use(sinonChai);
var expect = chai.expect;

var SwaggerTesting = rewire('../src/index.js');

var requestGetSpy = sinon.spy();

SwaggerTesting.__set__({
  request: {
    get: requestGetSpy
  }
})

type Callback = (err?: Error) => void;

describe('Minimal', function() {
  var swaggerSpec = require('./swaggers/minimal.json');

  var swagger = new SwaggerTesting(swaggerSpec, {host: 'http://localhost:3000'});

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

  describe('#testOperation', function() {
    it('Makes a GET call to "/" path', function() {
      const callbackFn = function callback(){};

      swagger.testOperation({operationPath: '/', operationName: 'GET'}, callbackFn);
      expect(requestGetSpy).to.have.been.calledWith('http://localhost/', callbackFn);
    });
  });
});
