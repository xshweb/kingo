var urllib = require('urllib'),
    iconv  = require('iconv-lite'),
    utils  = require('./lib/utils'),
    fs     = require('fs');

module.exports = Kingo;

function Kingo(options, sessionId) {
  this.options = options;
  this.sessionId = sessionId || utils.generateSessionId();
}

Kingo.prototype.request = function (url, options, callback) {
  url = this.options.baseUrl + url;

  options.headers = {
    cookie: 'ASP.NET_SessionId=' + this.sessionId,
    referer: options.referer || url,
  };

  urllib.request(url, options, function (error, data, response) {
    callback(error, iconv.decode(data, 'gbk'), response);
  });
};

Kingo.prototype.GET = function (url, data, callback) {
  callback = callback || data;
  this.request(url, {data: data}, callback);
};

Kingo.prototype.POST = function (url, data, callback) {
  callback = callback || data;
  this.request(url, {data: data, method: 'post'}, callback);
};

Kingo.prototype.login = function (sid, pwd, callback) {
  this.POST('_data/Index_LOGIN_tfc.aspx', {
    Sel_Type: 'STU',
    UserID:   sid,
    PassWord: pwd,
  }, function (error, data, response) {
    if (data.toString().indexOf('正在加载权限数据') != -1 ||
        response.statusCode == 302) {
      callback(error, true);
    } else {
      callback(error, false);
    }
  });
};

fs.readdirSync(__dirname + '/lib/functions').forEach(function (file) {
  if (file.substr(-3) == '.js') {
    Kingo.prototype[file.split('.')[0]] = require('./lib/functions/' + file);
  }
});
