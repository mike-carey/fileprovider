/**
 *
 */

'use strict'

const fs = require('fs-extra')
const path = require('path')

const FileProvider = require('../FileProvider')


class Local extends FileProvider {

    static get CONFIG () {
        return {
            root: './data'
        }
    }

    resolve (name) {
        if (path.isAbsolute(name)) {
            return name
        }

        return path.join(this.config.root, name)
    }

    /**
     * {@see fs.readFile}
     */
    read (file, options, next) {
        let f = this.resolve(file)

        return fs.ensureFile(f, () => {
            return fs.readFile(f, options, next)
        })
    }

    /**
     * {@see fs.writeFile}
     */
    write (file, data, options, next) {
        let f = this.resolve(file)

        return fs.ensureFile(f, () => {
            return fs.writeFile(f, data, options, next)
        })
    }

    /**
     * {@see fs.unlink}
     */
    delete (file, options, next) {
        let f = this.resolve(file)

        return fs.pathExists(f, (err, exists) => {
            if (exists) {
                return fs.unlink(f, next)
            } else {
                return next()
            }
        })
    }

    /**
     * {@see fs.append}
     */
    append (file, data, options, next) {
        let f = this.resolve(file)

        return fs.ensureFile(f, () => {
            return fs.appendFile(f, data, options, next)
        })
    }

}

module.exports = Local