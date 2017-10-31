/**
 *
 */

'use strict'

const _ = require('underscore')
const FileProvider = require('../FileProvider')


class Mock extends FileProvider {

    static get CONFIG () {
        return {
            testing: true
        }
    }

    /**
     * [read description]
     * @param  {[type]}   file    [description]
     * @param  {[type]}   options [description]
     * @param  {Function} next    [description]
     * @return {[type]}           [description]
     */
    read (file, options, next) {
        return false
    }

    /**
     * [write description]
     * @param  {[type]}   file    [description]
     * @param  {[type]}   data    [description]
     * @param  {[type]}   options [description]
     * @param  {Function} next    [description]
     * @return {[type]}           [description]
     */
    write (file, data, options, next) {
        return false
    }

    /**
     * [delete description]
     * @param  {[type]}   file    [description]
     * @param  {[type]}   options [description]
     * @param  {Function} next    [description]
     * @return {[type]}           [description]
     */
    delete (file, options, next) {
        return false
    }

}

module.exports = Mock