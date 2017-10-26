/**
 * @test Storage
 * @description Tests the Storage module
 */

'use strict'

const _ = require('underscore')
const assert = require('chai').assert

const support = require('./support')


describe('Storage', () => {

    let Storage = undefined

    beforeEach(() => {
        Storage = support.require('../src/Storage')
    })

    it('should throw an error if the {string} provider does not exist', () => {
        support.throws(() => {
            let storage = Storage.initialize('nothere')
        }, 'InvalidProviderError')
    })

    it.skip('should default the provider if undefined', () => {
        let storage = Storage.initialize('Local')

        support.instanceof(storage.instance, 'Local')
    })

    it('should have all the properties of the FileProvider', () => {
        let storage = Storage.initialize('Local')

        const string = typeof ''
        const fn = typeof (() => {})
        const object = typeof {}

        let PROPERTIES = {
            APPEND: string,
            CONFIG: object,
            read: fn,
            write: fn,
            append: fn,
            touch: fn,
            delete: fn
        }

        _.each(PROPERTIES, (type, prop) => {
            assert.equal(typeof storage[prop], type)
        })
    })

    it('should return the previous initialized instance', () => {
        let storage = Storage.initialize('Local')

        let _storage = new (Storage.constructor)()

        assert.equal(storage, _storage)
    })

    it('should throw an error if the constructor does not inherit from FileProvider', () => {
        class Mock {}

        support.throws(() => {
            let storage = Storage.initialize(Mock)
        }, 'InvalidProviderError')
    })

})