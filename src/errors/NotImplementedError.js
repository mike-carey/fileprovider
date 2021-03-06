/**
 * @module NotImplementedError
 * @description Defines an error to throw if a function or property was not implemented.
 *
 * @author Mike Carey <michael.r.carey@att.net>
 */

'use strict'

/**
 * An "interface" error that states a certain method or property was not overriden
 *
 * @class
 */
class NotImplementedError extends Error {}

module.exports = NotImplementedError