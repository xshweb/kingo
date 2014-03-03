module.exports = function (kingo, student) {
  it('.getRegistrations', function (done) {
    kingo.getRegistrations(function (error, registrations) {
      var registration = registrations.pop();

      registration.should.have.property('行政班级', student.className);
      registration.should.have.property('院(系)/部', student.college);
      done();
    });
  });
};
