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
        file = this.resolve(file)

        return fs.ensureFile(file, () => {
            return fs.readFile(file, options, next)
        })
    }

    /**
     * {@see fs.writeFile}
     */
    write (file, data, options, next) {
        file = this.resolve(file)

        return fs.ensureFile(file, () => {
            return fs.writeFile(this.resolve(file), data, options, next)
        })
    }

    /**
     * {@see fs.unlink}
     */
    delete (file, options, next) {
        file = this.resolve(file)

        return fs.pathExists(file, (err, exists) => {
            if (exists) {
                return fs.unlink(this.resolve(file), next)
            } else {
                return next()
            }
        })
    }

    /**
     * {@see fs.append}
     */
    append (file, data, options, next) {
        file = this.resolve(file)
        return fs.ensureFile(file, () => {
            return fs.appendFile(this.resolve(file), data, options, next)
        })
    }

}

module.exports = Local