/**
 *
 */

'use strict'

const _ = require('underscore')

const NotImplementedError = require('./NotImplementedError')


/**
 * [config description]
 * @type {Object}
 */
class FileProvider {

    /**
     * [config description]
     * @type {Object}
     */
    static get CONFIG() {
        throw new NotImplementedError()
    }

    /**
     * [config description]
     * @type {Object}
     */
    static get APPEND() {
        return 'APPEND'
    }

    /**
     * [construct description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    constructor(options) {
        this.config = {}
        _.each(this.constructor.CONFIG, (value, key) => {
            this.config[key] = value
        })

        Object.freeze(this.config)
    }

    /**
     * [read description]
     * @param  {[type]}   file    [description]
     * @param  {[type]}   options [description]
     * @param  {Function} next    [description]
     * @return {[type]}           [description]
     */
    read(file, options, next) {
        throw new NotImplementedError()
    }

    /**
     * [write description]
     * @param  {[type]}   file    [description]
     * @param  {[type]}   data    [description]
     * @param  {[type]}   options [description]
     * @param  {Function} next    [description]
     * @return {[type]}           [description]
     */
    write(file, data, options, next) {
        throw new NotImplementedError()
    }

    /**
     * [touch description]
     * @param  {[type]}   file    [description]
     * @param  {[type]}   options [description]
     * @param  {Function} next    [description]
     * @return {[type]}           [description]
     */
    touch(file, options, next) {
        options = options || {}
        this.constructor.APPEND in options && delete options[this.constructor.APPEND]

        return this.write(file, '', options, next)
    }

    /**
     * [append description]
     * @param  {[type]}   file    [description]
     * @param  {[type]}   data    [description]
     * @param  {[type]}   options [description]
     * @param  {Function} next    [description]
     * @return {[type]}           [description]
     */
    append(file, data, options, next) {
        options = options || {}
        options[this.constructor.APPEND] = true

        return this.write(file, data, options, next)
    }

    /**
     * [delete description]
     * @param  {[type]}   file    [description]
     * @param  {[type]}   options [description]
     * @param  {Function} next    [description]
     * @return {[type]}           [description]
     */
    delete(file, options, next) {
        throw new NotImplementedError()
    }

}

module.exports = FileProvider