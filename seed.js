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
  name: "photo1",
  location: "San Francisco",
  image: "https://raw.githubusercontent.com/monzelb/monzelb.github.io/master/assets/imgs/ocean.jpg",
  contents: "ocean"
  },
  {
  name: "photo2",
  location: "Canada",
  image: "",
  contents: "mountains"
  },
  {
  name: "photo3",
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
   name: "Vancouver"
  },
  {
  name: "rural Canada"
  }
]


db.Photo.remove({}, function(err, photo){
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
       console.log('removed all photo');

    // create new records based on the array books_list
       db.Photo.create(photo_list, function(err, photos){
      	if (err) { return console.log('err', err); }
     	 console.log("created", photos.length, "photos");
      	
       });
  }
});

db.Location.remove({}, function(err, location){
	if(err){
		console.log("Error", err);
	} else{
		console.log("removed all locations");

	   db.Location.create(location_list, function(err, locations){
    	   if(err){ return console.log("err", err);}
    	   console.log("created", locations.length, "locations");
    	   process.exit();
       });
    }
})

/*
db.Location.remove({}, function(err, locations) {
  console.log('removed all photos');
  db.Location.create(location_list, function(err, locations){
    if (err) {
      console.log(err);
      return;
    }
    console.log('recreated all locations');
    console.log("created", locations.length, "locations");
  

    db.Photo.remove({}, function(err, photos){
      console.log('removed all photos');
      photo_list.forEach(function (photoData) {
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

*/