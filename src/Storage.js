/**
 * @module Storage
 * @description A Facade for File Storage
 *
 * @author Mike Carey <michael.r.carey@att.net>
 */

'use strict'

const _ = require('underscore')

const debug = require('debug')('fileprovider:Storage')

const FileProvider = require('./FileProvider')
const InvalidProviderError = require('./errors/InvalidProviderError')

/**
 * Checks if a module exists.
 *
 * @param  {String} name Name of the module
 * @return {Boolean} true if the module does exist; false otherwise
 */
function moduleExists (name) {
    try {
        require(name)
    } catch (e) {
        /* istanbul ignore next */
        if (e.code !== 'MODULE_NOT_FOUND' || e.message.indexOf(name) === -1) {
            throw e
        }

        return false
    }

    return true
}

/**
 * A Facade for File Storage.
 *
 * @type {Object}
 */
class Storage {

    /**
     * Returns the Storage instance
     *
     * @constructor
     */
    constructor () {
        if (Storage.instance !== undefined) {
            return Storage.instance
        }

        Storage.instance = this
    }

    /**
     * Initializes the Storage Facade by specifying which Provider to use.
     *
     * @param  {Class|String} provider If a string is provided, the ./providers/{provider} module is loaded and replaces the provider argument; if a Class is provided, it must extend from FileProvider and is used in its place
     * @param  {Object} options  The options to be passed to the {provider} argument constructor
     *
     * @return {Reflection} A "Reflection" object which will have all the methods, static methods, instances, static constants of the provider specified
     *
     * @throws {InvalidProviderError} If a string is provided and the module does not exist at ./providers/{provider} OR a constructor is provided and does not extend from FileProvider
     */
    initialize (provider, options) {
        let self = this

        if (_.isString(provider)) {
            debug("Checking for module '%s'", './providers/' + provider)
            if (!moduleExists('./providers/' + provider)) {
                throw new InvalidProviderError("'" + provider + "' is not a valid provider")
            }

            provider = require('./providers/' + provider)
        }

        if (!(provider.prototype instanceof FileProvider)) {
            throw new InvalidProviderError("Provider must inherit from FileProvider")
        }

        debug('Provider {%s} has been initialized', provider.name)
        self.instance = new provider(options)
        Object.freeze(self.provider)


        debug('Applying changes to prototype')
        let subjects = [
            FileProvider,
            self.instance.constructor,
            FileProvider.prototype,
            self.instance.constructor.prototype,
            self.instance
        ]
        let IGNORE = ['constructor', 'length', 'name', 'prototype']
        subjects.forEach((subject) => {
            Object.getOwnPropertyNames(subject).forEach((prop) => {
                let value = subject[prop]

                if (IGNORE.indexOf(prop) == -1) {
                    debug('Adding %s property onto this', prop)
                    if (_.isFunction(value)) {
                        self[prop] = function (...args) {
                            return this.instance[prop](...args)
                        }
                    } else {
                        self[prop] = value
                    }
                } else {
                    debug('Ignoring %s property', prop)
                }
            })
        })

        debug('Done adding properties, freezing Storage object')
        Object.freeze(self)

        Storage.instance = self
        Object.freeze(Storage)

        return self
    }

}

module.exports = new Storage()