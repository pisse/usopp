'use strict'
/**
 * Created by lawrence on 9/12/16.
 */

module.exports = function* () {
  var route = this.route;
  if (!route.meta) return;
  var user;
  var privilege_menu_id = route.meta.privilege_menu_id + ''
  if (route.meta.auth && privilege_menu_id) {
    var cookies = this.req.cookies;
    var permissions = this.req.session['permissions'] || []; // cookies['permissions'];

    var host = this.req.header('Host');
    if (host.indexOf('localhost') > -1) {
      return true
    } else {
      if (permissions.length == 0) {
        return this.next(new Core.restify.UnauthorizedError('未登录'));
      }
      // var menu_ids = (new Buffer(permissions, 'base64').toString() || '').split(',');
      if (permissions.indexOf(privilege_menu_id) == -1) {
        return this.next(new Core.restify.UnauthorizedError('未有权限'));
      }
    }
    // var sid = this.req.query.sid || this.req.params.sid;
    /* user = yield Core.services.uic.getUser(sid);
    if (!user) {
      return this.next(new Core.restify.UnauthorizedError('未登录'));
    }*/
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