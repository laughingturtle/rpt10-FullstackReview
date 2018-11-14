const express = require('express');
var bodyParser = require('body-parser');
var getRepos = require('../helpers/github');
var saveInMongo = require('../database/index');
let app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function(req, res) {
  console.log(`${JSON.stringify(req.body.term)} was searched in server/index.js`);
  res.status(200).send('Yall good');
  // TODO - your code here!
  // This route should take the github username provided
  getRepos.getReposByUsername(req.body.term, function(err, res){
    if(err){
      console.log('error in server/index');
    } else {
     // console.log('bamm bamm my successful response', res);
      saveInMongo.save(res, function(err,res){
        if(err){
          console.log('error in server/index');
        } else {
          console.log('successful insert', res);
        }
      });
    }
  });
  // and get the repo information from the github API, then
  // save the repo information in the database
  // what's the username
  //
  //
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  // pulls data from DB to client
  // queries the db for the usr // gets 25 records posts to page
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

