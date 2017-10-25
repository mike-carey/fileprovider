/**
 *
 */

'use strict'

const fs = require('fs')
const path = require('path')
const caller = require('caller')
const mockFs = require('mock-fs')

const assert = require('chai').assert

module.exports = {

    require: function refreshedRequire(mod) {
        if (!path.isAbsolute(mod)) {
            mod = path.resolve(path.dirname(caller()), mod)
        }

        delete require.cache[require.resolve(mod)]

        return require(mod)
    },

    mock: {

        fs: function mockFs(...args) {
            let next = args.pop()

            // Assert we were given a function as the last parameter
            assert.isFunction(next, "The last parameter for a mock must be a callback function")

            let m = mockFs(...args)

            // Call the callback
            next(m)

            // Restore the filesystem
            mock.restore()
        }

    },

    /**
     * Prevents the NotImplementedError from being loaded which is not being tested in this suite
     */
    throws: function mustThrow(fn, err, message) {
        try {
            fn()
        } catch (e) {
            assert.equal(e.constructor.name, err, message)
        }
    }

}