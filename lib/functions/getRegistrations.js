var cheerio = require('cheerio');

module.exports = function (callback) {
  this.GET('xsxj/stu_xszcxs_rpt.aspx', function (error, html) {
    var $ = cheerio.load(html), registrations = [];

    $('table').eq(2).find('tr').each(function () {
      var td = $('td', this);

      registrations.push({
        '学年学期':  td.eq(1).text().strip(),
        '院(系)/部': td.eq(2).text().strip(),
        '年级/专业': td.eq(3).text().strip(),
        '行政班级':  td.eq(4).text().strip(),
        '学籍状态':  td.eq(5).text().strip(),
        '在校状态':  td.eq(6).text().strip(),
        '注册状态':  td.eq(7).text().strip(),
      });
    });

    callback(error, registrations);
  });
};
