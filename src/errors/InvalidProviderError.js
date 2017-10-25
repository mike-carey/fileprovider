/**
 * @module InvalidProviderError
 * @description Defines an error to throw if a provider string is presented but does not exist.
 *
 * @author Mike Carey <michael.r.carey@att.net>
 */

'use strict'

class InvalidProviderError extends Error {}

module.exports = InvalidProviderError