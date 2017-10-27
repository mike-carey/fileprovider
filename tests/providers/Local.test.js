/**
 * @test providers.Local
 * @description Tests the providers.Local module
 */

'use strict'

const fs = require('fs')
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
        support.mock.file('', {}, (err, file) => {
            if (err) {
                return done(err)
            }

            (new Local()).write(file, DATA, {}, (err) => {
                if (err) {
                    return done(err)
                }

                fs.readFile(file, (err, data) => {
                    if (err) {
                        return done(err)
                    }

                    assert.equal(data, DATA)

                    return done()
                })
            })
        })
    })

    it ('append', (done) => {
        let PRE = '// more data'
        support.mock.file(PRE, {}, (err, file) => {
            if (err) {
                return done(err)
            }

            (new Local()).append(file, DATA, {}, (err) => {
                if (err) {
                    return done(err)
                }

                fs.readFile(file, (err, data) => {
                    if (err) {
                        return done(err)
                    }

                    assert.equal(data, PRE + DATA)

                    return done()
                })
            })
        })
    })

    it ('touch', (done) => {
        support.mock.file('', {}, (err, file) => {
            if (err) {
                return done(err)
            }

            fs.unlink(file, (err) => {
                if (err) {
                    return done(err)
                }

                assert.isNotTrue(fs.existsSync(file));

                (new Local()).touch(file, {}, (err) => {
                    if (err) {
                        return done(err)
                    }

                    assert.isTrue(fs.existsSync(file))

                    return done()
                })
            })
        })
    })

    it('delete', (done) => {
        return done()
    })

})
