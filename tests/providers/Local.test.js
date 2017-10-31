/**
 * @test providers.Local
 * @description Tests the providers.Local module
 */

'use strict'

const fs = require('fs')
const path = require('path')
const assert = require('chai').assert

const support = require('../support')

describe('providers.Local', () => {

    let Local = undefined

    beforeEach(() => {
        Local = support.refresh('../../src/providers/Local')
    })

    function tempNotFile (done) {
        support.mock.file('', {}, (err, file) => {
            if (err) {
                return done(err)
            }

            return fs.unlink(file, (err) => {
                if (err) {
                    return done(err)
                }

                assert.isNotTrue(fs.existsSync(file))

                return done(null, file)
            })
        })
    }

    const DATA = '{"foo": "bar"}'

    it ('should read', (done) => {
        support.mock.file(DATA, {}, (err, file) => {
            if (err) {
                return done(err)
            }

            return (new Local()).read(file, {}, (err, data) => {
                if (err) {
                    return done(err)
                }

                assert.equal(DATA, data)

                return done()
            })
        })
    })

    it ('should write', (done) => {
        support.mock.file('', {}, (err, file) => {
            if (err) {
                return done(err)
            }

            return (new Local()).write(file, DATA, {}, (err) => {
                if (err) {
                    return done(err)
                }

                return fs.readFile(file, (err, data) => {
                    if (err) {
                        return done(err)
                    }

                    assert.equal(data, DATA)

                    return done()
                })
            })
        })
    })

    it ('should append', (done) => {
        const PRE = '// more data'

        support.mock.file(PRE, {}, (err, file) => {
            if (err) {
                return done(err)
            }

            return (new Local()).append(file, DATA, {}, (err) => {
                if (err) {
                    return done(err)
                }

                return fs.readFile(file, (err, data) => {
                    if (err) {
                        return done(err)
                    }

                    assert.equal(data, PRE + DATA)

                    return done()
                })
            })
        })
    })

    it ('should touch', (done) => {
        support.mock.file('', {}, (err, file) => {
            if (err) {
                return done(err)
            }

            return fs.unlink(file, (err) => {
                if (err) {
                    return done(err)
                }

                assert.isNotTrue(fs.existsSync(file))

                return (new Local()).touch(file, {}, (err) => {
                    if (err) {
                        return done(err)
                    }

                    assert.isTrue(fs.existsSync(file))

                    return done()
                })
            })
        })
    })

    it('should delete', (done) => {
        support.mock.file('', {}, (err, file) => {
            if (err) {
                return done(err)
            }

            assert.isTrue(fs.existsSync(file))

            return (new Local()).delete(file, {}, (err) => {
                if (err) {
                    return done(err)
                }

                assert.isNotTrue(fs.existsSync(file))

                return done()
            })
        })
    })

    describe('resolve', () => {

        it('should not modify absolute file', (done) => {
            support.mock.file('', {}, (err, file) => {
                if (err) {
                    return done(err)
                }

                assert.equal(file, (new Local()).resolve(file))

                return done()
            })
        })

        it('should extend relative file', () => {
            assert.equal(path.join('./data', 'foo.txt'), (new Local()).resolve('foo.txt'))
        })

    })

    describe('ignore missing directories', () => {

        describe('should create missing directories', () => {

            it('read', (done) => {
                tempNotFile((err, file) => {
                    if (err) {
                        return done(err)
                    }

                    return (new Local()).read(file, (err, data) => {
                        if (err) {
                            return done(err)
                        }

                        assert.equal(data, '')

                        return done()
                    })
                })
            })

            it('write', (done) => {
                tempNotFile((err, file) => {
                    if (err) {
                        return done(err)
                    }

                    return (new Local()).write(file, DATA, (err, data) => {
                        if (err) {
                            return done(err)
                        }

                        return fs.readFile(file, (err, data) => {
                            if (err) {
                                return done(err)
                            }

                            assert.equal(DATA, data)

                            return done()
                        })
                    })
                })

            })

            it('append', (done) => {
                tempNotFile((err, file) => {
                    if (err) {
                        return done(err)
                    }

                    return (new Local()).append(file, DATA, (err, data) => {
                        if (err) {
                            return done(err)
                        }

                        return fs.readFile(file, (err, data) => {
                            if (err) {
                                return done(err)
                            }

                            assert.equal(DATA, data)

                            return done()
                        })
                    })
                })

            })

            it('delete', (done) => {
                tempNotFile((err, file) => {
                    if (err) {
                        return done(err)
                    }

                    return (new Local()).delete(file, {}, (err) => {
                        if (err) {
                            return done(err)
                        }

                        assert.isNotTrue(fs.existsSync(file))

                        return done()
                    })
                })

            })
        })
    })

    it('should work full circle', (done) => {
        let local = new Local()

        tempNotFile((err, file) => {
            if (err) {
                return done(err)
            }

            return local.touch(file, {}, (err) => {
                if (err) {
                    return done(err)
                }

                assert.isTrue(fs.existsSync(file))

                return local.write(file, DATA, {}, (err) => {
                    if (err) {
                        return done(err)
                    }

                    return fs.readFile(file, (err, data) => {
                        if (err) {
                            return done(err)
                        }

                        assert.equal(DATA, data)

                        return local.read(file, {}, (err, data) => {
                            if (err) {
                                return done(err)
                            }

                            assert.equal(DATA, data)

                            return local.append(file, DATA, {}, (err) => {
                                if (err) {
                                    return done(err)
                                }

                                return fs.readFile(file, (err, data) => {
                                    if (err) {
                                        return done(err)
                                    }

                                    assert.equal(DATA + DATA, data)

                                    return local.delete(file, {}, (err) => {
                                        if (err) {
                                            return done(err)
                                        }

                                        assert.isNotTrue(fs.existsSync(file))

                                        return done()
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
})
