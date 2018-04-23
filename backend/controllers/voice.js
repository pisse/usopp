var _ = require('lodash');
var rq = require('request-promise');
var fs = require('fs');
var Q = require('q');
var Config = require('../config/app.js').get();
var ffmpeg = require('fluent-ffmpeg');
var AipSpeechServer = require('baidu-aip-sdk').speech;

// 设置appid/appkey/appsecret
var APP_ID = "10675852";
var API_KEY = "UBt9qY8qxpZ82WMNESUw61mv";
var SECRET_KEY = "hawkEpK3YSgjaXlFXOwykMkhlxyn5MEZ";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipSpeechServer(APP_ID, API_KEY, SECRET_KEY);

function secure() {
  var self = this;

  self.recognize = function * () {
    var path = this.requestParams.record.value.path;
    var lang = this.requestParams.lang.value || 1537
    console.log(path, lang)

    var deferred =  Q.defer();
    var command = ffmpeg();
    // audioFrequency 采样率
    command.addInput(path).audioFrequency(16000).saveToFile('./tmp/test.wav').on('error', function(err){
      console.log(err)
    }).on('end', function(){
      // 调用百度语音合成接口

      var voice = fs.readFileSync('./tmp/test.wav');
      var voiceBuffer = new Buffer(voice);
      client.recognize(voiceBuffer, 'wav', 16000, {dev_pid: lang}).then(function(result){
        console.log(result);
        deferred.resolve(result);
      }, function(err){
        console.log(err);
        deferred.resolve(err);
      });

    });

    return deferred.promise;
  }

};

module.exports = secure;