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

//repo_name, user_name, repo_url

let createInsert = (name, login, url) => {
  var item = {
    repo_name: name,
    user_name: login,
    repo_url: url
  }
};

let save = (data) => {
  console.log('my fucking api data: ', data);

  // if data already exists do nothing / check user_name ?
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports.save = save;