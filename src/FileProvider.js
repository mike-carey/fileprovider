/**
 *
 */

'use strict'

const _ = require('underscore')

const NotImplementedError = require('./errors/NotImplementedError')


/**
 * A base class for an object which will provide File Storage.
 *
 * @class
 *
 * @property {Object} config
 */
class FileProvider {

    /**
     * Provides indformation on configurations that can be provided to the provider.
     *
     * @type {Object}
     */
    static get CONFIG() {
        return {}
    }

    /**
     * A constanct for marking files for appending.
     *
     * @type {String}
     */
    static get APPEND() {
        return 'APPEND'
    }

    /**
     * Creates the FileProvider by iterating over the configurations specified by CONFIG and tossing them into the `this.config` object
     *
     * @constructor
     *
     * @param  {Object} options The configuration options to be added to the config object
     */
    constructor(options) {
        options = options || {}

        this.config = {}
        _.each(this.constructor.CONFIG, (value, key) => {
            if (options.hasOwnProperty(key)) {
                this.config[key] = options[key]
            } else {
                this.config[key] = value
            }
        })

        Object.freeze(this.config)
    }

    /**
     * Reads in file and returns the contents
     *
     * @param  {String}   file    The file to read in
     * @param  {Object}   options Extra options
     * @param  {Function(err, data)} next    A callback function for asynchronousness taking the form (err, data)
     */
    read(file, options, next) {
        throw new NotImplementedError()
    }

    /**
     * Writes contents to a file
     *
     * @param  {String}   file    The file to write to
     * @param  {String}   data    The data to write to the file
     * @param  {Object}   options Extra options
     * @param  {Function(err, data)} next    A callback function for asynchronousness taking the form (err, data)
     */
    write(file, data, options, next) {
        throw new NotImplementedError()
    }

    /**
     * Creates a file with nothing in it
     *
     * {@see write}
     */
    touch(file, options, next) {
        options = options || {}
        this.constructor.APPEND in options && delete options[this.constructor.APPEND]

        return this.write(file, '', options, next)
    }

    /**
     * Adds data onto a file without erasing its contents
     *
     * {@see write}
     */
    append(file, data, options, next) {
        options = options || {}
        options[this.constructor.APPEND] = true

        return this.write(file, data, options, next)
    }

    /**
     * Deletes a file
     *
     * @param  {String}   file    The file to delete
     * @param  {Object}   options Extra options
     * @param  {Function(err)} next    A callback function for asynchronousness taking the form (err)
     */
    delete(file, options, next) {
        throw new NotImplementedError()
    }

}

module.exports = FileProvider