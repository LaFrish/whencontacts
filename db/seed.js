var mongoose = require("./connection");
var seedData = require("./seeds");

var User = mongoose.model("User");

User.remove({}).then(function(){
  User.collection.insert(seedData).then(function(){
    process.exit();
  });
});
