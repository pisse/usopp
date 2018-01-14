/**
 * Created by lawrence on 4/19/16.
 */

var Highcharts = require('highcharts-server').default;
var serverConfig = require('../config/server.js');
var tool = require('cloneextend');
var Q = require('q');
// var server = new Highcharts(40001);

var HighchartServer = {
  server: null,
  config: null,
  init: function (conf) {
      var port = serverConfig.get().highchartPort;
      HighchartServer.server = new Highcharts(port);
  },
  render: function *(imgOptions, chartOptions) {
    var deferred = Q.defer();
    try {
      this.server.render(imgOptions, chartOptions, function (base64png) {
        deferred.resolve(base64png);
      });
    } catch (err) {
      throw new aza.BizError('生成highchart img错误');
    }
    return deferred.promise;
  }
}

module.exports = HighchartServer;