var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movies');

var Article = mongoose.model('rated',{
    'title':String
},'rated');

Article.find({}, function(err, article) {
  if (err) throw err;

  // object of all the users
  console.log(article);
});


/*var tempArticle = new Article({
  _values: 'Hi'
});

tempArticle.save(function(err) {
  if (err) throw err;

  console.log('User saved successfully!');
});*/
