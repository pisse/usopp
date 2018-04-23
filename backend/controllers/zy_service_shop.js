var _ = require('lodash');
var rq = require('request-promise');
var fs = require('fs');
var Q = require('q');
var Config = require('../config/app.js').get();
var ffmpeg = require('fluent-ffmpeg');
var urlencode = require('urlencode');
var md5 = require('md5')
var base64 = require('js-base64').Base64
var request = require('request');
var querystring = require('querystring')

// 设置publicKey privateKey
var PUBLIC_KEY = 'Mj9a2OLINooVVCYhUzTuLm24RoZHay+uFbClgQ6x070' // "sVVa4q5HrAQUqG+DuWX3SCZ/m6qJ6UNFpuGAmLU";
// var PRIVATE_KEY = "a33822cbd9a7539aadb70bb86dc20c7e";
var PRIVATE_KEY = '98e7b9b3ed5852d96a35bc60f678e7cb' // 'a33822cbd9a7539aadb70bb86dc20c7e';

// 追一服务HOST
var HOST = 'http://yieb.kf.wezhuiyi.com/yibot/' //'http://newdemo.kfyy.wezhuiyi.com:90' //'http://demo.kfyy.wezhuiyi.com:90' // http://api2.wezhuiyi.com/' //你试试demo.kfyy.wezhuiyi.com或

function zy_service() {
  var self = this;

  self.qa = function * () {
    var ip = this.request.header('x-forwarded-for') || this.request.ip || this.request.connection.remoteAddress
    // console.log(this.request.header('x-forwarded-for'), this.request.ip, this.request.connection.remoteAddress)
    ip = ip.split(':').pop();
    let sessionId = this.request.session.sid;
    let account = this.request.session.openid || '';
    let queries = {
      pubkey: PUBLIC_KEY,
      cid: this.requestParams.cid.value || 'user',
      eid: this.requestParams.eid.value,
      ip: ip,
      // source: 'demo',
      account: this.requestParams.account.value,
      sessionId: sessionId,
      labels: this.requestParams.labels.value,
      // secretkey: PRIVATE_KEY,
      question: this.requestParams.question.value
    }
    // 按字典排序
    let params = Object.keys(queries).sort(function (a, b) {
      return a > b
    });

    let values = [];
    for (let key of params) {
      if (queries[key]) {
        values.push(queries[key])
      }
    }
    // 末尾加上secretkey
    values.push(PRIVATE_KEY);
    // console.log(values);

    var rawStr = values.join(''); // [account, cid, ip, PUBLIC_KEY, question, sessionId, PRIVATE_KEY].join('')
    var strBase64 = base64.encode(rawStr)

    var options = {
      uri: HOST + 'query',
      qs: {
        account: queries['account'],
        cid: queries['cid'],
        ip: queries['ip'],
        // pubkey: urlencode(PUBLIC_KEY),
        // question: urlencode(question),
        // source: queries['source'],
        pubkey: PUBLIC_KEY,
        question: queries['question'],
        sessionId: queries['sessionId'],
        sign: md5(strBase64)
      },
      headers: {},
      json: true // Automatically parses the JSON string in the response
    };
    // console.log(options)
    var query_str = querystring.stringify(options.qs)
    var url = HOST + 'query?' + query_str
    // var url = 'http://newdemo.kfyy.wezhuiyi.com:90/query?account=18600557240&cid=user&ip=114.242.248.41&pubkey=sVVa4q5HrAQUqG%2BDuWX3SCZ/m6qJ6UNFpuGAmLU&question=1&sessionId=22223333&sign=dac1f63991d94720bd45bbdcf639450e'
    var res = yield rq(options);
    res.url = url
    res.options = options
    console.log(res)
    // var res = yield self.query.call(this, url)
    // console.log(res)

    /*return {
      url: url,
      raw_str: rawStr,
      base64_str: strBase64,
      md5_str: md5(strBase64),
      query_options: options,
      res: res
    }*/
    return res;
  }

  self.query = function * (url) {
    console.log(url)
    var deferred = Q.defer();
    request.get(url, {timeout: 200}, function (err, res, body) {

      if (err) {
        // Set to `true` if the timeout was a connection timeout, `false` or
        // `undefined` otherwise.
        // console.log(err.connect === true);
        deferred.reject(err);
      } else {
        // var body = JSON.parse(urlencode.decode(body));
        deferred.resolve(body);
      }
    });
    return deferred.promise
  }

  self.topTopic = function * () {
    var num = this.requestParams.num.value;
    var rawStr = [num, PUBLIC_KEY, PRIVATE_KEY].join('')
    var strBase64 = base64.encode(rawStr)

    var options = {
      uri: HOST + 'interface/faq/touch-rate',
      qs: {
        num: num,
        pubkey: urlencode(PUBLIC_KEY),
        sign: md5(strBase64)
      },
      headers: {
        // 'User-Agent': 'Request-Promise'
      },
      json: true // Automatically parses the JSON string in the response
    };
    // var res = yield rq(options);

    return {
      raw_str: rawStr,
      str_base64: strBase64,
      str_md5: md5(strBase64),
      query_options: options
      // res: res
    }
  }

};

module.exports = zy_service;