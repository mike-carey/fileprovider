# File Provider

[![Build Status](https://travis-ci.org/mike-carey/fileprovider.svg?branch=master)](https://travis-ci.org/mike-carey/fileprovider)
[![Coverage Status](https://coveralls.io/repos/github/mike-carey/fileprovider/badge.svg?branch=master)](https://coveralls.io/github/mike-carey/fileprovider?branch=master)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8b2b532cfb311d232d7b/test_coverage)](https://codeclimate.com/github/mike-carey/fileprovider/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/8b2b532cfb311d232d7b/maintainability)](https://codeclimate.com/github/mike-carey/fileprovider/maintainability)

Abstracts the file storage into a single module


## Installation
Using NPM
```
npm install fileprovider
```

Using Yarn
```
yarn add fileprovider
```

## Usage
```javascript
const Storage = require('fileprovider').initialize('Local', {dir: '/tmp'})

Storage.read('/tmp/foo.txt', (err, data) => {
    if (err) {
        throw err
    }

    console.log(data)
})


// If the STORAGE_PROVIDER variable is set
process.env.STORAGE_PROVIDER = 'Local'
const Storage = require('fileprovider')

Storage.read('/tmp/foo.txt', (err, data) => {
    if (err) {
        throw err
    }

    console.log(data)
})
```

## Configuration
The `STORAGE_PROVIDER` environment variable can be set to define the provider automatically without calling the `initialize` function.

## TODO
1. Allow initialization configurations through environment
2. Shift options if not provided