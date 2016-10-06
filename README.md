chai-stream-es6
===========

[![Build Status](https://travis-ci.org/joliveros/chai-stream-es6.svg?branch=master)](https://travis-ci.org/joliveros/chai-stream-es6)
[![npm version](https://badge.fury.io/js/chai-stream-es6.svg)](http://badge.fury.io/js/chai-stream-es6)

Extends Chai with assertions about streams.


Install
-------

### Node.js

```shell
npm install --save-dev chai-stream-es6
```


### AMD

```javascript
define(function(require, exports, module) {
  var chai = require('chai');
  var chaiStream = require('chai-stream-es6');

  chai.use(chaiStream);
});
```


### script tag

```html
<script src="chai.js"></script>
<script src="chai-stream-es6.js"></script>
```


Usage
-----

### BDD-Style

```javascript
var chai = require('chai');
var chaiStream = require('chai-stream-es6');
chai.use(chaiStream);

var expect = chai.expect;

describe('getMyStream', function() {
  it('should return a readable stream', function() {
    var stream = getMyStream();

    expect(stream).to.be.a.ReadableStream;
  });

  it('should return a stream that will end', function() {
    var stream = getMyStream();

    return expect(stream).to.end;
  });
});
```


#### expect(obj).to.be.a.Stream

Type: `function(any)`

This assertion check that the specified object have a `pipe` method.
So, it pass streams that not inherit Node's Stream.


##### obj

Type: `any`


#### expect(obj).to.be.a.ReadableStream

Type: `function(any)`

This assertion check that the specified object have a `pipe` and `resume` method.
So, it pass streams that not inherit Node's Stream.


##### obj

Type: `any`


#### expect(obj).to.be.a.WritableStream

Type: `function(any)`

This assertion check that the specified object have a `pipe` and `write` method.
So, it pass streams that not inherit Node's Stream.


##### obj

Type: `any`


#### expect(obj).to.end

Type: `function(any): Promise<void>`

Returns a promise that fulfilled when a `end` event is fired.
And this function force the stream to read (like piping with `WritableStream`).


##### obj

Type: `any`

`waitUntilStreamEnd` listen `end` or `error` event of the stream.


### TDD-Style

```javascript
var chai = require('chai');
var chaiStream = require('chai-stream-es6');
chai.use(chaiStream);

var assert = chai.assert;

describe('getMyStream', function() {
  it('should return a readable stream', function() {
    var stream = getMyStream();

    assert.isReadableStream(stream);
  });

  it('should return a stream that will end', function() {
    var stream = getMyStream();

    return assert.streamWillEnd(stream);
  });
});
```


#### assert.isStream(obj)

Type: `function(any)`

This assertion check that the specified object have a `pipe` method.
So, it pass streams that not inherit Node's Stream.


##### obj

Type: `any`


#### assert.isReadableStream(obj)

Type: `function(any)`

This assertion check that the specified object have a `pipe` and `resume` method.
So, it pass streams that not inherit Node's Stream.


##### obj

Type: `any`


#### assert.isWritableStream(obj)

Type: `function(any)`

This assertion check that the specified object have a `pipe` and `write` method.
So, it pass streams that not inherit Node's Stream.


##### obj

Type: `any`


#### assert.streamWillEnd(obj)

Type: `function(any): Promise<void>`

Returns a promise that fulfilled when a `end` event is fired.
And this function force the stream to read (like piping with `WritableStream`).


##### obj

Type: `any`

`waitUntilStreamEnd` listen `end` or `error` event of the stream.


License
-------

[MIT](https://github.com/joliveros/chai-stream-es6/blob/master/LICENSE) (c) [joliveros](https://github.com/joliveros)
