/**
 * @test
 * @description Tests the FileProvider module
 */

'use strict'

let support = require('./support')

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

})