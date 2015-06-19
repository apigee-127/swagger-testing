/// <reference path="../node_modules/swagger.d.ts/swagger.d.ts"/>
/// <reference path="../typings/node/node.d.ts"/>

var request = require('request');
var EventEmitter = require('events').EventEmitter;

interface TestOptions {
  host: string; // to use a different host for testing
}

var baseUrl = 'http://localhost:3000'; // FIXME: should be dynamic based on swagger

module.exports = function testSwagger(swagger: Swagger.Spec, options: TestOptions) {
  Object.keys(swagger.paths).forEach(function(pathName: string) {
    Object.keys(swagger.paths[pathName]).forEach(function(operationName: string) {
      if (operationName === 'get') {
        request.get(baseUrl + pathName, function(error, response) {
          if (error) return reportError(error);

          reportSuccess('✔️ ' + pathName + ' ' + operationName);
        });
      }
    });
  });
};


function reportError(error) {
  console.error('Swagger Testing Failure');
  console.error('=======================');
  console.error(error);
}

function reportSuccess(message) {
  console.log(message);
}
