# Swagger Testing

[![Build Status](https://travis-ci.org/apigee-127/swagger-testing.svg?branch=master)](https://travis-ci.org/apigee-127/swagger-testing)

> Automated RESTful API Testing Using [SwaggerAPI](http://swagger.io)

### Note: This project is under development and is not ready yet.

### Installation
```
npm install swagger-testing
```

### Usage

Use `SwaggerTesting` in your [Mocha](https://github.com/mochajs/mocha) tests:

```js
var SwaggerTesting = require('swagger-testing');
var swaggerSpec = require('./swagger.json');

var swagger = new SwaggerTesting(swaggerSpec);

// Automatically test all models
describe('Test my API', function() {
  swagger.testCRUD('/user', '/pet');
});

// Automatically test CRUD resources
describe('CRUD User (Automated)', function() {
  swagger.testCRUD('/user');
});

// Test all non mutating paths
describe('GET calls', function() {
  swagger.testAllOperations('GET');
});

// Manually test any operation
describe('CRUD Pet (Manual)', function() {
  var pet = null;

  it('Creates a Pet object', function() {
    swagger.testOperation({
      path: '/pet',
      operation: 'POST',
      onSuccess: function(result) { pet = result; }
    });
  });

  it('Reads the created Pet object', function() {
    swagger.testOperation({
      path: '/pet/' + pet.id,
      operation: 'GET'
    });
  });

  it('Updates the created Pet object', function() {
    pet.name = Math.random().toString(36);

    swagger.testOperation({
      path: '/pet',
      operation: 'PUT',
      data: pet
    });
  });

  it('Deletes the created Pet object', function() {
    swagger.testOperation({
      path: '/pet/' + pet.id,
      operation: 'DELETE'
    });
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
