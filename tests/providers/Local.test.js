/**
 * @test providers.Local
 * @description Tests the providers.Local module
 */

'use strict'

const assert = require('chai').assert

const support = require('../support')

describe('providers.Local', () => {

    let Local = undefined

    beforeEach(() => {
        Local = support.require('../../src/providers/Local')
    })

    let DATA = '{"foo": "bar"}'

    it ('read', (done) => {
        support.mock.file(DATA, {}, (err, file) => {
            if (err) {
                return done(err)
            }

            (new Local()).read(file, {}, (err, data) => {
                if (err) {
                    return done(err)
                }

                assert.equal(DATA, data)

                return done()
            })
        })
    })

    it('write', (done) => {
        return done()
    })

    it ('append', (done) => {
        return done()
    })

    it('delete', (done) => {
        return done()
    })

})
