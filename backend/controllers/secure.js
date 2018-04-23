var _ = require('lodash');
var rq = require('request-promise');
var Config = require('../config/app.js').get();

function secure() {
  var self = this;

  self.setCookie = function* () {
    var ip = this.request.header('x-forwarded-for') || this.request.ip || this.request.connection.remoteAddress

    var cookies = this.request.cookies;
    //域名信息
    var ssoDomain = 'sso.baidu.com';
    var retUrl = this.requestParams.retUrl.value || 'http://hotel.baidu.com/hotel/hotel.php';
    //秘钥信息
    var verify_ticket_url = 'http://ssa.baidu.com/sso/ticket/verifyTicket';
    var options = {
      method: 'POST',
      uri: verify_ticket_url,
      form: {
        url: retUrl,
        ip: ip,
        ticket: cookies[ssoDomain]
      }
    };
    var res = yield rq(options);
    var data = JSON.parse(res);
    var erp = '';
    if (data['REQ_FLAG']) {
      erp = data['REQ_DATA']['username'];
    }
    this.response.setCookie('username', erp, {
      path: '/',
      expires: (new Date(new Date().getTime() + 1000 * 60 * 60 * 24))
    })
    return erp
  }

  self.login = function * () {
    var code = this.requestParams.code.value;
    console.log(Config)
    var options = {
      method: 'POST',
      uri: 'https://api.weixin.qq.com/sns/jscode2session',
      form: {
        appid: Config.appId,
        secret: Config.appSelect,
        js_code: code,
        grant_type: 'authorization_code'
      }
    };
    var res = yield rq(options);
    var data = JSON.parse(res);
    var session = this.request.session;
    if (!data.errcode) {
      session['secretKey'] = data['session_key']
      session['openid'] = data['openid']
      session['unionid'] = data['unionid']
    } else {
      throw new Core.BizError('登录失败')
    }
    return session.sid;
  }
  self.logout = function* () {
    this.response.setCookie('restifySessionid', '', {
      path: '/',
      expires: (new Date(new Date().getTime() - 60 * 60))
    })

    return true
  }

};

module.exports = secure;