// require express and other modules
var express = require('express'),
    app = express();

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


var profile= [{name: "Brett Monzel",
              githubLink: "https://github.com/monzelb",              
              personalSiteLink: "https://monzelb.github.io/",
              cityOfOrigin: "Cincinnati, Ohio",
              currentCity: "San Francisco, California"
              }]
/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  res.json({
     // CHANGE ME ;)
    message: "Welcome to my photography api! Here's what you need to know!",
    documentationUrl: "https://github.com/monzelb/express-personal-api/blob/master/README.md", // CHANGE ME
    baseUrl: "https://powerful-brushlands-77187.herokuapp.com/", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Important facts about me"}, // CHANGE ME
      {method: "POST", path: "/api/photography", description: "Photographs I've taken"} // CHANGE ME
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

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
