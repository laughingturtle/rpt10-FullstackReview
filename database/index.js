const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

//Get the default connection
var db = mongoose.connection;

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repo_name: String,
  user_name: String,
  repo_url: String
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
 //console.log('my parsed api data: ', data);
    console.log('success ---->>/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////')
    //console.log('data.name : --> ', data[0].name);
    //console.log('data.html_url : --> ', data[0].html_url);
    //console.log('data.owner.login : --> ', data[0].owner.login);
    //console.log('data.length: ', data.length);

    var dataForInsert = [];

    for(var u = 0; u < data.length; u++){
     // console.log('data.name : ', data[u].name);
     // console.log('data.html_url : ', data[u].html_url);
     // console.log('data.owner.login : ', data[u].owner.login);
      dataForInsert.push({user_name: data[u].owner.login, repo_name: data[u].name, repo_url: data[u].html_url});
    }
    //console.log('dataForInsert', dataForInsert);

    Repo.insertMany(dataForInsert)
    .then((res) => {
       // console.log("insert sampleCollection result ", res);
        cb(null, res);
    })
    .catch(err => {
        console.log("bulk insert sampleCollection error ", err);
    });

    // if data already exists do nothing / check user_name ?
    // TODO: Your code here
    // This function should save a repo or repos to
    // the MongoDB
  }


//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports.save = save;