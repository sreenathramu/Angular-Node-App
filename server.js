var express = require('express');
var app = express()
var mongoose = require('mongoose');
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/movies'); // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(methodOverride());

var Rated = mongoose.model('Rated', {
    'title': String,
    'year': String,
    'genres': Array,
    'rating': Array,
    'poster': String,
    'contentRating': String,
    'duration': String,
    'releaseData': Date,
    'averageRating': Number,
    'originalTitle': String,
    'storyLine': String,
    'actors': Array,
    'imdbRating': Number,
    'posterurl': String
}, 'rated');


app.get('/api/movies', function(req, res) {
    // use mongoose to get all todos in the database
    Rated.find(function(err, movies) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)
        res.json(movies); // return all todos in JSON format
    });
});

app.get('/api/moviesFilter', function(req, res) {
  console.log("In Node:"+req.query.q);
  Rated.find({originalTitle:new RegExp(req.query.q, "i")},function(err, movies) {
      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err)
          res.send(err)
      res.json(movies); // return all todos in JSON format
  });
});

app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});
// listen (start app with node server.js) ======================================
app.listen(8082);
console.log("App listening on port 8082");
