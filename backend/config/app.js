/**
 * Created by lawrence on 5/13/16.
 */
"use strict";
var tool = require('cloneextend'),
    conf = {};
conf.production = {
    errorHandler: {},
    username: 'notifyServer',
    password: 'MVecH/daAnjTLACPSt5JDA==' //eatjoys
};
conf.jarpay = {
    errorHandler: {},
    username: 'jarpay',
    password: 'MVecH/daAnjTLACPSt5JDA==' //eatjoys
};
conf.development = {
    errorHandler: {dumpExceptions: true, showStack: true}
};
conf.pre = {
  errorHandler: {dumpExceptions: true, showStack: true}
};
conf.defaults = {
    name: 'notifyServer',
    contactEmail: 'huangzhihua@jd.com',
    salt: '1234567890TIANZI',
    routePath: '../routes',
    title: 'MBA-NodeJS-后台API',
    api_basePath: '/node',
    description: 'Api的nodejs实现'
};

exports.get = function get(env, obj) {
    var settings = tool.cloneextend(conf.defaults, conf[env || 'development']);
    return ('object' === typeof obj) ? tool.cloneextend(settings, obj) : settings;
}