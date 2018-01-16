/**
 * Created by lawrence on 5/13/16.
 */
'use strict'
var tool = require('cloneextend'),
  conf = {}
conf.production = {
  errorHandler: {},
  username: 'notifyServer',
  password: 'MVecH/daAnjTLACPSt5JDA==' //eatjoys
}
conf.jarpay = {
  errorHandler: {},
  username: 'jarpay',
  password: 'MVecH/daAnjTLACPSt5JDA==' //eatjoys
}
conf.development = {
  errorHandler: {dumpExceptions: true, showStack: true}
}
conf.pre = {
  errorHandler: {dumpExceptions: true, showStack: true}
}
conf.defaults = {
  name: 'notifyServer',
  contactEmail: 'huangzhihua@baidu.com',
  salt: '1234567890TIANZI',
  routePath: '../routes',
  title: 'Usoop',
  api_basePath: '/node',
  description: '我得了一种不编码就会死掉的病！',
  appId: 'wx8048f6a4464bce18',
  appSelect: '6cb30280748866d95021bb6b356a5c1b'
}

exports.get = function get (env, obj) {
  var settings = tool.cloneextend(conf.defaults, conf[env || 'development'])
  return ('object' === typeof obj) ? tool.cloneextend(settings, obj) : settings
}