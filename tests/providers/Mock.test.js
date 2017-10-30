/**
 * @test providers.Mock
 * @description Tests the providers.Mock module
 */

'use strict'

const assert = require('chai').assert

const support = require('../support')

describe('providers.Mock', () => {

    let Mock = undefined

    beforeEach(() => {
        Mock = support.refresh('../../src/providers/Mock')
    })

    it ('read', () => {
        assert.isNotTrue((new Mock()).read())
    })

    it ('write', () => {
        assert.isNotTrue((new Mock()).write())
    })

    it ('append', () => {
        assert.isNotTrue((new Mock()).append())
    })

    it ('touch', () => {
        assert.isNotTrue((new Mock()).touch())
    })

    it ('delete', () => {
        assert.isNotTrue((new Mock()).delete())
    })

})
