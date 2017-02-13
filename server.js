// require express and other modules
var express = require('express'),
    app = express();
    db = require('./models');

    var app = express();
// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/


/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});


/*
 * JSON API Endpoints
 */

app.get('/api', function apiIndex(req, res) {
  res.json({
    message: "Welcome to my photography API! Here's what you need to know!",
    documentationUrl: "https://github.com/monzelb/express-personal-api/blob/master/README.md", // CHANGE ME
    baseUrl: "https://powerful-brushlands-77187.herokuapp.com/", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Important facts about me"}, 
      {method: "GET", path: "/api/photography", description: "Photographs I've taken"} ,
      {method: "GET", path: "api/locations", description: "Locations of photographs in the database"},
      {method: "GET", path: "api/contents", description: "search photographs by location"}

    ]
  })
});

app.get('/api/profile', function profile(req, res){
    res.json(
            {name: "Brett Monzel",
              githubLink: "https://github.com/monzelb",              
              personalSiteLink: "https://monzelb.github.io/",
              cityOfOrigin: "Cincinnati, Ohio",
              currentCity: "San Francisco, California",
              })
});

app.get('/api/photography', function (req, res) {
  // find all photos
  var query = {};
  for(var item in req.query){
    if(req.query[item].length>1) query[item] = req.query[item]
  }
console.log(query)
  db.Photo.find(query, function(err, photos){
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json(photos);
  });
});

//delete a photo
app.delete('/api/photography/:id', function (req, res) {
  // get photo id from url params (`req.params`)
  console.log('photo delete', req.params);
  var photoId = req.params.id;
  // find the index of the photo we want to remove
  db.Photo.findOneAndRemove({ _id: photoId })
  console.log("delete")
});




//find one photo by id
app.get('/api/photography/:id', function (req, res) {
   db.Photo.findById(req.params.id, function(err, photo){
     if(err){return console.log(err);}
     res.json(photo);
   })
 })

 //update contents
app.put('/api/contents/:id', function(req,res){
    var photoName = req.body.name;
    var photoContents = req.body.contents;
    var photoImage = req.body.image;
    var domainId = req.params.id;
    db.Photo.findByIdAndUpdate(PhotoId, {
        name: photoName,
        characteristics: photoContents,
        image: photoImage, {new: true}, function(err, photo){
          if(err){return console.log(err);}
          res.json(photo);
        })
});


//post new photo
app.post('/api/photography', function (req, res) {
  var newPhoto = new db.Photo({
    location: req.body.location,
    image: req.body.image,
    contents: req.body.contents
})
    newPhoto.save(function(err, photo){
      if (err) {
        return console.log("save error: " + err);
      }
      res.json(photo);
    });
  });



/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
