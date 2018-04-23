var _ = require('lodash');
var rq = require('request-promise');
var fs = require('fs');
var Q = require('q');
var ffmpeg = require('fluent-ffmpeg');
var AipSpeechServer = require('baidu-aip-sdk').speech;

// 设置appid/appkey/appsecret
var APP_ID = "10675852";
var API_KEY = "UBt9qY8qxpZ82WMNESUw61mv";
var SECRET_KEY = "hawkEpK3YSgjaXlFXOwykMkhlxyn5MEZ";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipSpeechServer(APP_ID, API_KEY, SECRET_KEY);


var command = ffmpeg();
command.addInput('./upload_b71816a6aba527fb97aa3914683fa038').audioFrequency(16000).saveToFile('./tt.wav').on('error', function(err){
  console.log(err)
}).on('end', function(){
  // 调用百度语音合成接口

  var voice = fs.readFileSync('./tt.wav');
  var voiceBuffer = new Buffer(voice);
  client.recognize(voiceBuffer, 'wav', 16000).then(function(result){
    console.log(result);
  }, function(err){
    console.log(err);
  });

});
