var _ = require('lodash');

module.exports = function (kingo, student) {
  it('.getArchives', function (done) {
    kingo.getArchives(function (error, archives) {
      archives.should.have.property('姓名', student.name)
      archives.should.have.property('民族', student.nation)
      done();
    });
  });

  it('.getArchivesFromGradeExam', function (done) {
    kingo.getArchivesFromGradeExam(function (error, archives) {
      if (!_.isEmpty(archives)) {
        archives.should.have.property('姓名', student.name)
        archives.should.have.property('院(系)/部', student.college)
        archives.should.have.property('行政班级', student.className)
      }
      done();
    });
  });
};
