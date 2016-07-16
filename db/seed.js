var mongoose = require("./connection");
var seedData = require("./seeds");

var Contact = mongoose.model("Contact");

Contact.remove({}).then(function(){
  Contact.collection.insert(seedData).then(function(){
    process.exit();
  });
});
