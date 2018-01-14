/**
 * Created by lawrence on 5/13/16.
 */
"use strict";
var tool = require('cloneextend'),
    conf = {};
conf.production = {
};
conf.jarpay = {
};
conf.development = {
    errorHandler: {dumpExceptions: true, showStack: true}
};
conf.pre = {
  errorHandler: {dumpExceptions: true, showStack: true}
};
conf.defaults = {
    platName: '智能酒店',
    ztpGroup: '',
    sender: '',
    name: '',
    pwd: ''
};

exports.get = function get(env, obj) {
    var settings = tool.cloneextend(conf.defaults, conf[env || 'development']);
    return ('object' === typeof obj) ? tool.cloneextend(settings, obj) : settings;
}