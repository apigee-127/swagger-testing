# Swagger Testing

[![Build Status](https://travis-ci.org/apigee-127/swagger-testing.svg?branch=master)](https://travis-ci.org/apigee-127/swagger-testing)

> Automated RESTful API Testing Using [SwaggerAPI](http://swagger.io)

### Note: This project is under development and is not ready yet.

### Installation
```
npm install swagger-testing
```

### Usage

#### Independent

```js
var SwaggerTesting = require('swagger-testing');
var swaggerSpec = require('./swagger.json');

var swagger = new SwaggerTesting(swaggerSpec);

swagger.testOperation({path: '/pet', operation: 'GET'}, function (err) {
  if (!err) {
    console.log('Successfully tested GET /pet');
  }
});

swagger.testCRUD('/user', '/pet', function (err) {
  if (!err) {
    console.log('All CRUD operations for all objects in my API are tested successfully.');
  }
});
```

#### In Mocha/Jasmine tests

Use `SwaggerTesting` in your [Mocha](https://github.com/mochajs/mocha) tests:

```js
var SwaggerTesting = require('swagger-testing');
var swaggerSpec = require('./swagger.json');

var swagger = new SwaggerTesting(swaggerSpec);

// Automatically test all models
describe('My API', function() {
  it ('tests all objects CRUD operations', function(done){
    swagger.testCRUD('/user', '/pet', done);
  });
});

```

### API

```js
// Automatically test all models
swagger.testCRUD('/user', '/pet');
```

```js
// Automatically test CRUD resources
swagger.testCRUD('/user');
```

```js
// Test all non mutating paths
swagger.testAllOperations('GET');
```

```js
// Test a specific operation
swagger.testOperation({
  path: '/pet',
  operation: 'PUT',
  data: pet
});
```

### A complex flow  

```js
describe('CRUD Pet (Manual)', function() {
  var pet = null;

  it('Creates a Pet object', function(done) {
    swagger.testOperation({path: '/pet', operation: 'POST'}, function(err, result) {
      pet = result;
      done();
    });
  });

  it('Reads the created Pet object', function(done) {
    swagger.testOperation({path: '/pet/' + pet.id, operation: 'GET'}, done);
  });

  it('Updates the created Pet object', function(done) {
    pet.name = Math.random().toString(36);

    swagger.testOperation({
      path: '/pet',
      operation: 'PUT',
      data: pet
    }, done);
  });

  it('Deletes the created Pet object', function(done) {
    swagger.testOperation({path: '/pet/' + pet.id, operation: 'DELETE'}, done);
  });
});

```

### Development

To make a new build

```shell
npm run build
```

To run the test

```shell
npm test
```

### License

[MIT](./LICENSE)
