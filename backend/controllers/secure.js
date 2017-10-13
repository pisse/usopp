var _ = require('lodash');
var rq = require('request-promise');

function secure() {
  var self = this;

  self.setCookie = function* () {
    var ip = this.request.header('x-forwarded-for') || this.request.ip || this.request.connection.remoteAddress

    var cookies = this.request.cookies;
    //域名信息
    var ssoDomain = 'sso.jd.com';
    var retUrl = this.requestParams.retUrl.value || 'http://mba.jd.com/mba/mba.php';
    //秘钥信息
    var verify_ticket_url = 'http://ssa.jd.com/sso/ticket/verifyTicket';
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

  self.logout = function* () {
    this.response.setCookie('username', '', {
      path: '/',
      expires: (new Date(new Date().getTime() - 60 * 60))
    })

    this.response.setCookie('sso.jd.com', '', {
      path: '/',
      domain: '.jd.com',
      expires: (new Date(new Date().getTime() - 60 * 60))
    })
    return ''
  }

};

module.exports = secure;