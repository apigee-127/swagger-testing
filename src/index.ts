/// <reference path="../node_modules/swagger.d.ts/swagger.d.ts"/>
/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/request/request.d.ts"/>
/// <reference path="../typings/lodash/lodash.d.ts"/>
/// <reference path="../typings/z-schema/z-schema.d.ts"/>

// TODO: move to it's own file
module SwaggerTestingModule {
  export declare class Error {
    public name: string;
    public message: string;
    public stack: string;
    constructor(message?: string);
  }

  export class SwaggerTestingError extends Error {
    constructor(public message: string) {
      super(message);
      this.name = 'SwaggerTestingError';
      this.message = message;
      this.stack = (<any>new Error()).stack;
    }

    toString() {
      return `${this.name}: ${this.message}`;
    }
  }
}

module SwaggerTestingModule {
  var request = require('request');
  var _ = require('lodash');
  var ZSchema = require('z-schema');

  var JSONSchema = new ZSchema();

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

  var OPERAION_NAMES = ['get', 'post', 'put', 'patch', 'delete', 'head'];

  class SwaggerTesting {
    options: SwaggerTestingOptions;
    swagger: Swagger.Spec;

    constructor(swagger: Swagger.Spec, options: SwaggerTestingOptions = {}) {
      if (!swagger || !_.isObject(swagger)) {
        throw new TypeError('swagger must be an object.');
      }
      this.swagger = swagger;
      this.options = options;
    }

    private get baseUrl(): string {
      // TODO: complete me
      return this.options.baseUrl ||
        'http://' + (this.swagger.host || 'localhost') + (this.swagger.basePath || '/');
    }

    /*
     *
     * @throws TypeError
    */
    testOperation(config: TestOperationConfig, cb: Callback = noop) {

      if (!config || !_.isObject(config)) {
        throw new TypeError('config should be an object.');
      }

      if (!_.isString(config.operationName)) {
        throw new TypeError('operationName should be a string.');
      }

      if (!_.isString(config.operationPath)) {
        throw new TypeError('operationPath should be a string.');
      }

      var operationName = config.operationName.toLowerCase();

      if (!_.contains(OPERAION_NAMES, operationName)) {
        throw new TypeError(`operationName should be one of ${OPERAION_NAMES.join(' ')}`);
      }

      request[operationName](this.baseUrl, (error, response, body) => {
        if (error) { return cb(error); }

        // TODO: guard against all sort of things that can go wrong here
        var schema = this.swagger.paths[config.operationPath][operationName]
                      .responses[200].schema;

        var isValid = JSONSchema.validate(body, schema);

        if (!isValid) {
          cb(new SwaggerTestingError(`response is not conforming to schema.
            operation: ${config.operationName}
            path: ${config.operationPath}
            response: 200
          `));
        } else {
          cb(null);
        }
      });
    }

    /*
     *
    */
    testAllOperations(operationName: string, cb: Callback = noop) {
      throw new Error('Not implemented');
    }
  }

  function noop(): void {}

  module.exports = SwaggerTesting;
}
