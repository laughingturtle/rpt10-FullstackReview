const request = require('request');
const config = require('../config');
const data = require('../database/index')

let getReposByUsername = (term, cb) => {
  var query = term;
  var pageSize = 25;

  let options = {
    url:`https://api.github.com/users/${query}/repos?order=desc+&per_page=${pageSize}`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  request.get(options, function (err, res) {
          if (err) {
            console.log('no data, this sucked ', err);
          } else {
            //console.log('we\'re inside request --->', res.body);
            cb(null, res.body);
          }
        });
}



module.exports.getReposByUsername = getReposByUsername;
