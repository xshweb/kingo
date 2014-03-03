module.exports = function (kingo, student) {
  it.skip('.getEffectiveScores', function (done) {
    kingo.getEffectiveScores(function (error, scores) {
      console.log(JSON.stringify(scores, null, 2));
      done();
    });
  });

  it.skip('.getOriginalScores', function (done) {
    kingo.getOriginalScores(function (error, scores) {
      console.log(JSON.stringify(scores, null, 2));
      done();
    });
  });
};
