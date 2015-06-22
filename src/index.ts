/// <reference path="../node_modules/swagger.d.ts/swagger.d.ts"/>
/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/request/request.d.ts"/>
/// <reference path="../typings/lodash/lodash.d.ts"/>

import request = require('request');
import _ = require('lodash');

type Callback = (error?: Error)=>void

interface BasicAuthValue {
  username: string;
  password: string;
}

interface SwaggerTestingOptions {
  auth?: BasicAuthValue; /*| APIKeyAuthValue | OAuthAuthValue */
  baseUrl?: string; // to use a different host for testing
}

interface TestOperationConfig {
  operationPath: string;
  operationName: string;
}

class SwaggerTesting {
  options: SwaggerTestingOptions;
  swagger: Swagger.Spec;

  constructor(swagger: Swagger.Spec, options: SwaggerTestingOptions) {
    this.swagger = swagger;
    this.options = options;
  }

  get baseUrl(): string {
    // TODO: complete me
    return this.options.baseUrl ||
      'http://' + (this.swagger.host || 'localhost') + (this.swagger.basePath || '/');
  }

  /*
   *
  */
  testOperation(config: TestOperationConfig, cb: Callback = noop) {
    request[config.operationName.toLowerCase()](this.baseUrl, cb);
  }

  /*
   *
  */
  testAllOperations(operationName: string, cb: Callback = noop) {
    if (!_.contains(['get', 'head'], operationName.toLowerCase())) {
      throw new Error('Only non-mutating operations can be used here.');
    }
    // find all operations with the same operationName
  }
}

function noop(): void {}

module.exports = SwaggerTesting;
