/**
 * @test
 * @description Tests the NotImplementedError module
 */

'use strict'

const support = require('./support')

const assert = require('chai').assert


describe('NotImplementedError', () => {

    let NotImplementedError = undefined

    beforeEach(() => {
        NotImplementedError = support.require('../src/NotImplementedError')
    })

    it('should throw an error', () => {
        support.throws(() => {
            throw new NotImplementedError()
        }, 'NotImplementedError')
    })

})