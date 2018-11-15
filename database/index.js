const mongoose = require('mongoose');
var moment = require('moment');

mongoose.connect('mongodb://localhost/fetcher');

//Get the default connection
var db = mongoose.connection;

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repo_name: String,
  user_name: String,
  repo_url: String,
  updated_at: Date
});

let Repo = mongoose.model('Repo', repoSchema);

// collate data into array.

// Repo.collection.insert(data, onInsert);

  // let createModel = (name, login, url) => {
  //   var item = {
  //     repo_name: name,
  //     user_name: login,
  //     repo_url: url
  //   }
  // };

  let save = (data, cb) => {
    data = JSON.parse(data);
    console.log('success //////////////////// ---->>');

    var dataForInsert = [];


    Repo.findOne({user_name: data[0].owner.login}, 'updated_at').sort({updated_at:-1}).exec((err, result) => {
      if(err){
        console.log('error in the findOne', err);
      } else {
        if(result){
          result = result.updated_at;
        }
        console.log('FindOne result --> ', result);
        result = result || moment("1721-11-04T14:12:56Z");
        console.log('result', result);
        for(var u = 0; u < data.length; u++){
          if (moment(result) < moment(data[u].updated_at)) {
            dataForInsert.push({user_name: data[u].owner.login, repo_name: data[u].name, repo_url: data[u].html_url, updated_at: data[u].updated_at});
          }
        }
        Repo.insertMany(dataForInsert)
          .then((res) => {
            // console.log("insert sampleCollection result ", res);
              cb(null, res);
          })
          .catch(err => {
              console.log("bulk insert sampleCollection error ", err);
          });
        }
    });

  }




  let retrieve = (cb) => {

    Repo.find().sort({repo_name:-1}).limit(25).exec(function(err, data) {
      if (err) return console.error(data);
        //console.log('my res: ', res);
        cb(null, data);
    });
  }
// yay

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports.save = save;
module.exports.retrieve = retrieve;