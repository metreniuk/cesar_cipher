function parseTxt() {
  var fs = require('fs');

  var words = {};
  var text = [];
  fs.readFile('./words.txt', 'utf-8', function(err, data) {
    if (err)
      throw err;

    if (data) {
      text = data.split('\n');
      for (var i in text) {
        words[i] = text[i].split('\t')[1]
      }
      fs.writeFile('./src/words.json', JSON.stringify(words), function(err) {
      	if (err)
      		throw err;
			});
    }
  });
}

parseTxt();