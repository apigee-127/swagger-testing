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

SwaggerTesting.__set__({
  request: {
    get: sinon.spy()
  }
})

type Callback = (err?: Error) => void;

describe('Minimal', function() {
  var swaggerSpec = require('./swaggers/minimal.json');

  var swagger = new SwaggerTesting(swaggerSpec);

  describe('#testOperation', ()=> {
    describe('Makes a GET call to "/" path', ()=> {
      it('works when server reponds with correct response', ()=> {
        sinon.stub(request, 'get')
          .yields(null, null, 'Hello, World!');
        var callbackFn = sinon.spy();

        swagger.testOperation({operationPath: '/', operationName: 'GET'}, callbackFn);

        // we only care about the URL in this assertion
        expect(request.get).to.have.been.calledWithMatch('http://localhost/');
        expect(callbackFn).to.have.been.calledWith(null);

        request.get.restore();
      });

      it('fails when server responds with incorrect response', ()=> {
        sinon.stub(request, 'get')
          .yields(null, null, 42);
        var callbackFn = sinon.spy();

        swagger.testOperation({operationPath: '/', operationName: 'GET'}, callbackFn);

        // we only care about the URL in this assertion
        expect(request.get).to.have.been.calledWithMatch('http://localhost/');
        expect(callbackFn).to.have.been.calledWithMatch(Error);

        request.get.restore();
      });
    });
  });
});
