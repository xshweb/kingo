var cheerio = require('cheerio'),
    utils   = require('../utils');

module.exports = function (callback) {
  this.GET('xsxj/stu_myinfo_rpt.aspx', function (error, html) {
    callback(error, utils.parseArchives(cheerio.load(html)('table').eq(0)));
  });
};
