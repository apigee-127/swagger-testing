# Swagger Testing

[![Build Status](https://travis-ci.org/apigee-127/swagger-testing.svg?branch=master)](https://travis-ci.org/apigee-127/swagger-testing)

> Automated RESTful API Testing Using [SwaggerAPI](http://swagger.io)

### Installation
```
npm install swagger-testing
```

### Usage

```js
var swaggerTesting = require('swagger-testing');
var swaggerSpec = require('./swagger.json');

swaggerTesting(swaggerSpec);

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

