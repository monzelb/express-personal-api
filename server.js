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

// var db = require('./models');

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
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  res.json({
     // CHANGE ME ;)
    message: "Welcome to my photography API! Here's what you need to know!",
    documentationUrl: "https://github.com/monzelb/express-personal-api/blob/master/README.md", // CHANGE ME
    baseUrl: "https://powerful-brushlands-77187.herokuapp.com/", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Important facts about me"}, 
      {method: "GET", path: "/api/photography", description: "Photographs I've taken"} ,
      {method: "GET", path: "api/ locations", description: "Locations of photographs in the database"}

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
  // find one book by its id
  db.Photo.find({}, function(err, photos){
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json(photos);
  });
});

app.get('/api/locations', function (req, res) {
  db.Location.find({}, function(err, locations){
      if(err){
        res.status(500).send(err);
        return;
      }
      res.json(locations);
  });
});



app.post('/api/photography', function (req, res) {
  // create new book with form data (`req.body`)
  var newPhoto = new db.Photo({
    location: req.body.location,
    image: req.body.image
  });
  // find the author from req.body
  db.Location.findOne({name: req.body.location}, function(err, location){
    if (err) {
      return console.log(err);
    }
    // add this author to the book
    newPhoto.location = location;
    // save newBook to database
    newPhoto.save(function(err, photo){
      if (err) {
        return console.log("save error: " + err);
      }
      console.log("saved ", photo.title);
      // send back the book!
      res.json(photo);
    });
  });

});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
