/**
 * @test providers.Local
 * @description Tests the providers.Local module
 */

'use strict'

const fs = require('fs')
const assert = require('chai').assert
const mockery = require('mockery')

const support = require('../support')

describe('providers.Local', () => {

    const FILE = '/tmp/file.txt'

    let Local = undefined

    beforeEach(() => {
        mockery.enable({
            warnOnUnregistered: false
        })

        Local = support.require('../../src/providers/Local')
    })

    afterEach(() => {
        mockery.disable()
    })

    describe('should wrap fs calls', () => {

        it('read', () => {
            support.mock.fs(FILE, () => {
                mockery.registerMock('fs', {
                    readFile: (file, options, next) => {
                        assert.equal(file, FILE)
                    }
                })
            })
        })

        it('write', () => {

        })

        it ('append', () => {

        })

        it('delete', () => {

        })

    })

})
