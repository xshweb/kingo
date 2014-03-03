var should   = require('should'),
    fixtures = require('./fixtures'),
    kingo    = new (require('../'))(fixtures.options),
    student  = fixtures.students[0];

describe('kingo', function () {
  describe('.login', function () {
    it('with wrong password', function (done) {
      kingo.login(student.sid, '', function (error, data) {
        data.should.be.false;
        done();
      });
    });

    it('with correct password', function (done) {
      kingo.login(student.sid, student.pwd, function (error, data) {
        data.should.be.true;
        done();
      });
    });
  });
});
