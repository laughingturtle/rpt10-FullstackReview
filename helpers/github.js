const request = require('request');
const config = require('../config');
const data = require('../database/index')

let getReposByUsername = (term) => {
  var query = term;
  var pageSize = 25;

  let options = {
    url:`https://api.github.com/users/${query}/repos?order=desc+&per_page=${pageSize}`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  request(options, function (err, res, body) {
          if (!err && res.statusCode == 200) {
              //console.log('My api call response ---> : ', body); // Print the contents.
              console.log('we\'re inside request --->', body);
             // console.log(res.headers);
              // return body;
            /// how do I get data from here to the database index file?

          } else {
            console.log('no data, this sucked ', err);
          }
        });
}

module.exports.getReposByUsername = getReposByUsername;
