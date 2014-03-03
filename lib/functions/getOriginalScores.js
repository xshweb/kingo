var cheerio = require('cheerio');

module.exports = function (callback) {
  this.POST('xscj/stu_myscore_rpt.aspx', {
    SJ:       0,
    SelXNXQ:  0,
    zfx_flag: 0,
    zxf:      0,
  }, function (error, html) {
    var titles = [
          '序号',
          '课程/环节',
          '学分',
          '类别',
          '课程类别',
          '考核方式',
          '修读性质',
          '平时',
          '中考',
          '末考',
          '技能',
          '成绩',
          '辅修标记',
          '备注'],
        scores = [],
        $      = cheerio.load(html),
        tables = $('table');

    for (var i = 1; i < tables.length; i += 3) {
      var semester = {
        semester: /：(.*)/.exec(tables.eq(i).find('td').first().text())[1],
        scores: [],
      };

      tables.eq(i + 2).find('tr').each(function (index) {
        var td    = $('td', this),
            score = {};

        for (var i = 1; i < titles.length; i++) {
          score[titles[i]] = td.eq(i).text();
        }

        /*
         * 需要注意的是，<td align>course<br></td> 被 cheerio 解析成了
         * <td align="&gt;course&lt;br"></td> 
         */

        score['课程/环节'] =
          /\](.*)</.exec(td.eq(1).attr('align').strip())[1];
        semester.scores.push(score);
      });

      scores.push(semester);
    }

    callback(error, scores);
  });
};
