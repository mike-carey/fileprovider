/**
 *
 */

'use strict'

const fs = require('fs')

const FileProvider = require('../FileProvider')


class Local extends FileProvider {

    static get CONFIG () {
        return {}
    }

    /**
     * {@see fs.readFile}
     */
    read (file, options, next) {
        return fs.readFile(file, options, next)
    }

    /**
     * {@see fs.writeFile}
     */
    write (file, data, options, next) {
        return fs.writeFile(file, data, options, next)
    }

    /**
     * {@see fs.unlink}
     */
    delete (file, options, next) {
        return fs.unlink(file, next)
    }

    /**
     * {@see fs.append}
     */
    append (file, data, options, next) {
        return fs.appendFile(file, data, options, next)
    }

}

module.exports = Local