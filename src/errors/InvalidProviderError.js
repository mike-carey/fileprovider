/**
 * @module InvalidProviderError
 * @description Defines an error to throw if a provider string is presented but does not exist.
 *
 * @author Mike Carey <michael.r.carey@att.net>
 */

'use strict'

/**
 * An error for when a provider does not meet the needed implementations
 *
 * @class
 */
class InvalidProviderError extends Error {}

module.exports = InvalidProviderError