/**
 * @test NotImplementedError
 * @description Tests the NotImplementedError module
 */

'use strict'

const support = require('../support')

const assert = require('chai').assert


describe('errors.NotImplementedError', () => {

    let NotImplementedError = undefined

    beforeEach(() => {
        NotImplementedError = support.refresh('../../src/errors/NotImplementedError')
    })

    it('should throw an error', () => {
        support.throws(() => {
            throw new NotImplementedError()
        }, 'NotImplementedError')
    })

})