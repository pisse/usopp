/**
 * Created by lawrence on 5/13/16.
 */
"use strict";
var tool = require('cloneextend'),
    conf = {};
conf.production = {
    mysql: {
      host: '',
      user: '',
      password: '&',
      database: '',
      port: 3358
    },
    redis: {
        host: '127.0.0.1',
        port: 6379,
        password: ''
    }
};
conf.jarpay = {
    mysql: {
      host: '',
      user: '',
      password: '&',
      database: '',
      port: 3358
    },
    redis: {
        host: '',
        port: 6379,
        password: ''
    }
};
conf.pre = {
    mysql: {
      host: '',
      user: '',
      password: '',
      database: '',
      port: 3358
    },
    redis: {}
};
conf.development = {
    mysql: {
      host: 'localhost',
      user: 'root',
      password: '123456',
      database: '',
      port: 3306
    },
    redis: {}
};
conf.defaults = {};

exports.get = function get(env, obj) {
    var settings = tool.cloneextend(conf.defaults, conf[env || 'development']);
    return ('object' === typeof obj) ? tool.cloneextend(settings, obj) : settings;
}