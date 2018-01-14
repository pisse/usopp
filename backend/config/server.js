/**
 * Created by lawrence on 5/13/16.
 */

"use strict";
var tool = require('cloneextend'),
    conf = {};
conf.production = {
    host: 'ai.baidu.com',
    port: process.env.port || 40000
};
conf.jarpay = {
    host: 'ai.baidu.com',
    port: process.env.port || 40000
};
conf.pre = {
    host: 'ai.baidu.com',
    port: process.env.port || 40000
};
conf.development = {
    host: 'localhost',
    port: process.env.port || 40000
};
conf.defaults = {};

exports.get = function get(env, obj) {
    var settings = tool.cloneextend(conf.defaults, conf[env || 'development']);
    return ('object' === typeof obj) ? tool.cloneextend(settings, obj) : settings;
}