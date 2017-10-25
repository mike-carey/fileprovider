/**
 *
 */

'use strict'


const FileProvider = require('../FileProvider')


class Local extends FileProvider {

    static get CONFIG () {
        return {}
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

module.exports = Local