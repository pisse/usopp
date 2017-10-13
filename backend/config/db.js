/**
 * Created by lawrence on 5/13/16.
 */
"use strict";
var tool = require('cloneextend'),
    conf = {};
conf.production = {
    mysql: {
      host: 'bquency0m.mysql.jddb.com',
      user: 'category_fre_rw',
      password: '4zfvA&ibg6pzvylcycfAnbzdwxkztm',
      database: 'mbadb',
      port: 3358
    },
    redis: {
        host: '127.0.0.1',
        port: 6379,
        password: '99a9676a734fcdbd53802189be0984fc'
    }
};
conf.jarpay = {
    mysql: {
      host: 'bquency0m.mysql.jddb.com',
      user: 'category_fre_rw',
      password: '4zfvA&ibg6pzvylcycfAnbzdwxkztm',
      database: 'mbadb',
      port: 3358
    },
    redis: {
        host: 'r-uf6143436c3e2ef4.redis.rds.aliyuncs.com',
        port: 6379,
        password: 'Jarpay112233'
    }
};
conf.pre = {
    mysql: {
      host: 'bquency0m.mysql.jddb.com',
      user: 'category_fre_rw',
      password: '4zfvA&ibg6pzvylcycfAnbzdwxkztm',
      database: 'mbadb',
      port: 3358
    },
    redis: {}
};
conf.development = {
    mysql: {
      host: 'localhost',
      user: 'root',
      password: '123456',
      database: 'mba2',
      port: 3306
    },
    redis: {}
};
conf.defaults = {};

exports.get = function get(env, obj) {
    var settings = tool.cloneextend(conf.defaults, conf[env || 'development']);
    return ('object' === typeof obj) ? tool.cloneextend(settings, obj) : settings;
}