/**
 * @module providers.Local
 * @description The Mock file provider for testing purposes
 *
 * @author Mike Carey <michael.r.carey@att.net>
 */

'use strict'

const _ = require('underscore')
const FileProvider = require('../FileProvider')

/**
 * A Mock filr provider for testing
 */
class Mock extends FileProvider {

    /**
     * {@inheritdoc}
     */
    static get CONFIG () {
        return {
            testing: true
        }
    }

    /**
     * {@inheritdoc}
     */
    constructor (options) {
        console.warn("The Mock provider object is to be used for testing purposes only")

        super(options)
    }

    /**
     * {@inheritdoc}
     */
    read (file, options, next) {
        return false
    }

    /**
     * {@inheritdoc}
     */
    write (file, data, options, next) {
        return false
    }

    /**
     * {@inheritdoc}
     */
    delete (file, options, next) {
        return false
    }

}

module.exports = Mock