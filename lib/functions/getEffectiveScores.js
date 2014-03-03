var cheerio = require('cheerio');

module.exports = function (callback) {
  this.POST('xscj/stu_myscore_rpt.aspx', {
    SJ:       1,
    SelXNXQ:  0,
    zfx_flag: 0,
    zxf:      0,
  }, function (error, html) {
    var titles = [],
        scores = [],
        count  = -1,
        $      = cheerio.load(html);

    $('#theTableHead td').each(function () {
      titles.push($(this).text().strip());
    });

    $('#ID_Table tr').each(function () {
      var td       = $('td', this),
          semester = td.eq(0).text().strip(),
          score    = {};

      if (semester) {
        scores[++count] = {
          semester: semester,
          scores: [],
        };
      }

      for (var i = 1; i < titles.length; i++) {
        score[titles[i]] = td.eq(i).text();
      }

      score['课程/环节'] = score['课程/环节'].replace(/\[.*\]/, '');
      scores[count].scores.push(score);
    });

    callback(error, scores);
  });
};
