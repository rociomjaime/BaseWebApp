var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname));

// views is directory for all template files
app.set('views', __dirname + '/html');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/map', function(request, response) {
  response.render('pages/map');
});

app.get('/journal', function(request, response) {
  response.render('pages/journal');
});

app.get('/tradeoff', function(request, response) {
  response.render('pages/tradeoff');
});

app.get('/tradeoff-brogrammers', function(request, response) {
  response.render('pages/tradeoff-brogrammers');
});

app.get('/tradeoff-smith', function(request, response) {
  response.render('pages/tradeoff-smith');
});

app.get('/opensource', function(request, response) {
  response.render('pages/opensource');
});
app.get('/map1', function(request, response) {
  response.render('pages/map1');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});




// This file is what handles incoming requests and
// serves files to the browser, or executes server-side code
