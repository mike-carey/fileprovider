/**
 * @test
 * @description Tests the FileProvider module
 */

'use strict'

const assert = require('chai').assert

const support = require('./support')


describe('FileProvider', () => {

    let FileProvider = undefined

    beforeEach(() => {
        FileProvider = support.require('../src/FileProvider')
    })

    it('should throw implementation errors when not overriden', () => {

        support.throws(() => {
            let fp = new FileProvider()
        }, 'NotImplementedError')

        class MockProvider extends FileProvider {
            static get CONFIG() {
                return {}
            }
        }

        let mp = new MockProvider()

        support.throws(() => {
            mp.read()
        }, 'NotImplementedError')

        support.throws(() => {
            mp.write()
        }, 'NotImplementedError')

    })

    it('should set configuration options', () => {

        class MockProvider extends FileProvider {
            static get CONFIG() {
                return {
                    foo: undefined
                }
            }
        }

        let mp = new MockProvider({
            foo: 'bar'
        })

        assert.equal(mp.config.foo, 'bar')
    })

    it('should skip configurations not present', () => {

        class MockProvider extends FileProvider {
            static get CONFIG() {
                return {
                    foo: 'bar',
                    bar: 'baz'
                }
            }
        }

        let mp = new MockProvider()

        assert.equal(mp.config.foo, 'bar')
        assert.equal(mp.config.bar, 'baz')

        mp = new MockProvider({
            foo: 'baz'
        })

        assert.equal(mp.config.foo, 'baz')
        assert.equal(mp.config.bar, 'baz')
    })

})