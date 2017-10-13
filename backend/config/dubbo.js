/**
 * Created by lawrence on 5/7/16.
 */
"use strict";
var tool = require('cloneextend'),
    conf = {};
conf.production = {
    /**
     * 注册中心
     */
    registry: 'dubbo-registry.eatjoys.com:12181',
    /**
     * 负载均衡规则, 目前只有轮询
     */
    loadbalance: '',
    /**
     * 懒加载, 用于开发阶段, 快速启动
     */
    lazy: false
};
conf.jarpay = {
    /**
     * 注册中心
     */
    registry: 'dubbo-registry.jarpay.com:12181',
    /**
     * 负载均衡规则, 目前只有轮询
     */
    loadbalance: '',
    /**
     * 懒加载, 用于开发阶段, 快速启动
     */
    lazy: false
};
conf.pre = {
    /**
     * 注册中心
     */
    registry: 'dubbo-registry.eatjoys.com:12181',
    /**
     * 负载均衡规则, 目前只有轮询
     */
    loadbalance: '',
    /**
     * 懒加载, 用于开发阶段, 快速启动
     */
    lazy: true
};
conf.development = {
    /**
     * 注册中心
     */
    registry: 'dubbo-registry.eatjoys.com:12181',
    /**
     * 负载均衡规则, 目前只有轮询
     */
    loadbalance: '',
    /**
     * 懒加载, 用于开发阶段, 快速启动
     */
    lazy: true
};
conf.defaults = {
    application: {
        'application': 'dubbo_node_client',
        'application.version': '1.0',
        'category': 'consumer',
        'dubbo': '2.8.4',
        'side': 'consumer',
        'pid': process.pid,
        'version': '1.0'
    }
};

exports.get = function get(env, obj) {
    var settings = tool.cloneextend(conf.defaults, conf[env || 'development']);
    return ('object' === typeof obj) ? tool.cloneextend(settings, obj) : settings;
}