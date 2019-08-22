// var express = require('express');
// var router = express.Router();

// router.get("/", function(req, res){
//   res.render("qoutes");
// });

// module.exports = router;

exports.home = function(req, res){
  // var movies = moviesJson.movies;
  //Render Home Template
  res.render('quotes', {
    title: 'THe movies HOme Page!',
    // movies: movies
  });
};
