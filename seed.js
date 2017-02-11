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
  id: 1,
  location: "San Francisco",
  image: "https://raw.githubusercontent.com/monzelb/monzelb.github.io/master/assets/imgs/ocean.jpg",
  contains: "Ocean"
  },
  {
  id: 2,
  location: "Canada",
  image: "",
  contains: "Mountains"
  },
  {
  id: 3,
  location: "Mt. Shasta",
  image: "",
  contains: "mountains"
  },
 
];