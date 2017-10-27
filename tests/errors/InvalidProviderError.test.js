/**
 * @test InvalidProviderError
 * @description Tests the InvalidProviderError module
 */

'use strict'

const support = require('../support')

const assert = require('chai').assert


describe('errors.InvalidProviderError', () => {

    let InvalidProviderError = undefined

    beforeEach(() => {
        InvalidProviderError = support.require('../../src/errors/InvalidProviderError')
    })

    it('should throw an error', () => {
        support.throws(() => {
            throw new InvalidProviderError()
        }, 'InvalidProviderError')
    })

})