// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

// var db = require('./models');

// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })

var db = require('./models');

var photo_list = [
  {
  location: "San Francisco",
  image: "https://raw.githubusercontent.com/monzelb/monzelb.github.io/master/assets/imgs/ocean.jpg",
  contents: "ocean"
  },
  {
  location: "Canada",
  image: "",
  contents: "mountains"
  },
  {
  location: "Mt. Shasta",
  image: "",
  contents: "mountains"
  },
 
];

var location_list= [
  {
   name: "San Francisco"
  },
  {
   name: "British Columbia"
  }
]

var content_list = [
   {
   name: "ocean"
   },
   {
   name: "mountains"
   },
   {
   name: "city"
   }
]

db.Location.remove({}, function(err, locations) {
  console.log('removed all photos');
  db.Location.create(location_list, function(err, locations){
    if (err) {
      console.log(err);
      return;
    }
    console.log('recreated all locations');
    console.log("created", locations.length, "locations");

    db.Contents.remove({}, function(err, contents) {
  console.log('removed all contents');
  db.Contents.create(content_list, function(err, contents){
    if (err) {
      console.log(err);
      return;
    }
    console.log('recreated all contents');
    console.log("created", contents.length, "contents");


    db.Photo.remove({}, function(err, photos){
      console.log('removed all photos');
      photos_list.forEach(function (photoData) {
        var photo = new db.Photo({
          image: photoData.image,
          contents: photoData.contents
        });
        db.Photo.findOne({name: photoData.location}, function (err, foundLocation) {
          console.log('found location ' + foundLocation.name + ' for photo ');
          if (err) {
            console.log(err);
            return;
          }
          photo.location = foundLocation;
          photo.save(function(err, savedPhoto){
            if (err) {
              return console.log(err);
            }
            console.log('saved ' + savedPhoto.title + ' of ' + foundLocation.name);
          });
        });
      });
    });

  });
});