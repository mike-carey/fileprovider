/**
 *
 */

'use strict'

const fs = require('fs')
const tmp = require('tmp')
const path = require('path')
const caller = require('caller')
const mockFs = require('mock-fs')
const mockery = require('mockery')

const assert = require('chai').assert

module.exports = {

    require: function refreshedRequire (mod) {
        if (!path.isAbsolute(mod)) {
            mod = path.resolve(path.dirname(caller()), mod)
        }

        delete require.cache[require.resolve(mod)]

        return require(mod)
    },

    mock: {

        file: function mockFile (data, options, next) {
            tmp.file({
                mode: '0777',
                prefix: 'testfile-',
                postfix: '.tmp'
            }, (err, path, fd) => {
                if (err) {
                    console.error("Could not create temporary file")
                    return next(err)
                }

                return fs.writeFile(file, data, options, (err) => {
                    if (err) {
                        console.error("Could not write data to the temporary file")
                        return next(err)
                    }

                    return next(null, file, fd)
                })
            })
        }

    },

    /**
     * Prevents the NotImplementedError from being loaded which is not being tested in this suite
     */
    throws: function mustThrow (fn, err, message) {
        try {
            fn()
        } catch (e) {
            assert.equal(e.constructor.name, err, message)
        }
    },

    instanceof: function mustBeInstanceOf (instance, type, message) {
        assert.equal(typeof instance, type, message)
    }

}