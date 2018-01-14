/**
 * Created by lawrence on 4/19/16.
 */

var nodemailer = require('nodemailer');
var Q = require('q');
var ejs = require('ejs');
var path = require('path');
var Config = require('../config/mail.js').get();

var Mailer = {
  transporter: null,
  config: null,
  init: function (conf) {
    var smtpConfig = {
      host: 'smtp.jd.com',
      //port: 465,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: Config.name, // mobile-reportdata
        pass: Config.pwd // 3%redDog$#$6
      },
      tls: {
        rejectUnauthorized: false
      }
    };
    Mailer.config = smtpConfig;
    Mailer.transporter = nodemailer.createTransport(smtpConfig);
  },
  getTpl: function *(tplPath, data) {
    var deferred = Q.defer();
    ejs.renderFile(tplPath, {data: data}, {}, function (err, str) {
      // str => Rendered HTML string
      if (err) {
        console.log(err);
        deferred.reject(new Error(err));
      } else {
        deferred.resolve(str);
      }
    });
    return deferred.promise;
  },
  sendMail: function *(opt, tplName, data) {
    if (tplName) {
      var TPL_DAILY = path.join(__dirname, '../views/mail/'+ tplName +'.html');
      opt.html = yield this.getTpl(TPL_DAILY, data);
    }
    //var deferred = Q.defer();
    var options = {
      from: 'ztp_crew@jd.com', // 发送者
      text: 'JD',
      html: 'Hello'
    };
    Object.assign(options, opt);
    options['subject'] = Config.platName + '-' + options['subject'];
    this.transporter.sendMail(options, function (err, info) {
      if (err) {
        console.log(err);
        // deferred.reject(new Error(err));
        // return;
      }
      console.log('发送成功');
      //deferred.resolve('发送成功');
    });
    return true
    //return deferred.promise;
  }
}

module.exports = Mailer;