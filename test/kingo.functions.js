var should     = require('should'),
    fixtures   = require('./fixtures'),
    kingo      = new (require('../'))(fixtures.options),
    fs         = require('fs');

describe('kingo', function () {
  before(function (done) {
    kingo.login(fixtures.student.sid, fixtures.student.pwd, function () {
      done();
    });
  });

  fs.readdirSync(__dirname + '/functions').forEach(function (file) {
    if (file.substr(-3) == '.js') {
      require('./functions/' + file)(kingo, fixtures.student);
    }
  });
});
