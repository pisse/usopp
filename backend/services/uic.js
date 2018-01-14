/**
 * Created by lawrence on 5/7/16.
 */

// var dubboClient = require('dubbo-node-client');

module.exports = {
    init: function () {
        /*dubboClient.config(getConfig('dubbo').get(process.env.NODE_ENV));

        var env = process.env.NODE_ENV;
        if (env == 'production') {
            env = 'prod';
        }
        else if (env == 'jarpay') {
            env = 'jarpay';
        }

        //获取serivce
        this.userProvider = dubboClient.getService('com.eatjoys.uic.api.AccountService', '1.0.0-' + env);
        require('util').log('Intializing uic service...,Intializing config: \n', getConfig('dubbo').get(env));*/
    },
    getUser: function (sid) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.userProvider.call('getUser', sid)
                .then(function (result) { //成功
                    resolve(result);
                })
                .catch(function (error) { //失败
                    reject(error);
                })
                .finally(function () { //不管成功还是失败

                });
        });
    }
};