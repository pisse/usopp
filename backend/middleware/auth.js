'use strict'
/**
 * Created by lawrence on 9/12/16.
 */

module.exports = function *() {
    var route = this.route;
    if (!route.meta)return;
    var user;
    if (route.meta.auth) {
        var sid = this.req.query.sid || this.req.params.sid;
        if(!sid){
            return this.next(new Core.restify.UnauthorizedError('未登录'));
        }
        user = yield Core.services.uic.getUser(sid);
        if (!user) {
            return this.next(new Core.restify.UnauthorizedError('未登录'));
        }
    } else {
        user = {
            shopID: 5,
            sid: '11hw080vt7k3f5f0axe13vopetest',
            mobile: 13899999999,
            customID: 1,
            userName: '麦子'
        };
    }
    this.req.user = user;
};