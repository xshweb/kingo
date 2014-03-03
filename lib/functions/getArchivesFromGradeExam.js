var cheerio = require('cheerio'),
    utils   = require('../utils');

module.exports = function (callback) {
  this.GET('xscj/stu_djksbm_rpt.aspx', function (error, html) {
    var $tables  = cheerio.load(html)('table');

    if ($tables.length == 4) {
      callback(error, utils.parseArchives($tables.eq(1)));
    } else {
      callback(error, {});
    }
  });
};
