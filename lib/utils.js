String.prototype.strip = function() {
  return String(this).replace(/\s/g, '');
};

exports.generateSessionId = function () {
  var characters = '012345abcdefghijklmnopqrstuvwxyz',
      sessionId  = '';

  for (var count = 0; count < 24; count++) {
    sessionId += characters.charAt(Math.floor(
      Math.random() * characters.length));;
  }

  return sessionId;
};

exports.parseArchives = function ($table) {
  var archives = {};

  $table.find('tr').each(function (i) {
    var td = $table.find('tr').eq(i).find('td');

    for (var i = 0; i < td.length; i += 2) {
      var key   = td.eq(i).text().strip(),
      value = td.eq(i + 1).text().strip();

      if (key && value) {
        archives[key] = value;
      }
    }
  });

  return archives;
};
