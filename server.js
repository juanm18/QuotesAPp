var express = require('express');
var path = require('path');
// var serverStatic = require('serve-static');
var routes = require('./routes');

let app = express();
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine", "ejs");
// app.use(routes);
app.get('/', routes.home);
const port = process.env.PORT || 5000;
app.listen(port, function(){
  console.log("Listening on port " + port)
});
