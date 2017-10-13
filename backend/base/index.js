'use strict'

var Core = require('./core/')
var path = require('path')

var cwd = path.join(__dirname, '..')

module.exports = global.Core = new Core({
  cwd: cwd
})
