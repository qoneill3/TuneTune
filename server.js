// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();

//bodyparser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));



/************
 * DATABASE *
 ************/

var db = require('./models');



/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index (req, res){
  res.json({
    message: "Welcome to tunely!",
    documentation_url: "https://github.com/tgaff/tunely/api.md",
    base_url: "http://tunely.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
});

app.get('/api/albums', function album_index(req, res){
  db.Album.find({}, function(err, albums) {
    res.json({albums});
  });
});

app.post('/api/albums', function (req, res) {
  var newAlbum = req.query;
  console.log(req.query);
  db.Album.create(newAlbum, function(err, album) {
    res.json(album);
  });
});

app.get('/api/albums/:id', function(req, res) {
  db.Album.find({_id: req.params.id}, function(err, album){
    res.json(album);
  })
})

app.post('/api/albums/:id/songs', function(req, res) {
  db.Song.create(req.query,function(err, song){
    db.Album.findOne({_id: req.params.id}, function(err, album){
      let nalbum = album;
      nalbum.songs.push(song);
      console.log(nalbum.songs);
      db.Album.update({_id: req.params.id}, nalbum, function(){
        res.json(nalbum);
      })
    });
  });
  
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});