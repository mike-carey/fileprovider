# File Provider
Abstracts the file storage into a single module

[![Build Status](https://travis-ci.org/mike-carey/fileprovider.svg?branch=master)](https://travis-ci.org/mike-carey/fileprovider)



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
```
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