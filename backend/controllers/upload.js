var _ = require('lodash');

function upload() {
  var self = this;

  self.img = function * () {
    var path = this.requestParams.image.value.path;
    return 'upload' + path.split('upload').pop();
  }

};

module.exports = upload;