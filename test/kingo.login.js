var should   = require('should'),
    fixtures = require('./fixtures'),
    kingo    = new (require('../'))(fixtures.options);

describe('kingo', function () {
  describe('.login', function () {
    it('with wrong password', function (done) {
      kingo.login(fixtures.student.sid, '', function (error, data) {
        data.should.be.false;
        done();
      });
    });

    it('with correct password', function (done) {
      kingo.login(fixtures.student.sid, fixtures.student.pwd, function (error, data) {
        data.should.be.true;
        done();
      });
    });
  });
});
