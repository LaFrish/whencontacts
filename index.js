var express = require("express");
var parser = require("body-parser");
var hbs     = require("express-handlebars");
var mongoose = require("./db/connection");

var app     = express();

var User = mongoose.model("User");

// if(process.env.NODE_ENV !== "production"){
//   var env = require("./env");
// }
app.set("port", process.env.PORT || 3001);
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));

app.use("/assets", express.static("public"));
app.use(parser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.render("app-welcome");
});

app.get("/users", function(req, res){
  User.find({}).then(function(users){
    res.render("users-index", {
      users: users
    });
  });
});

app.get("/users/:name", function(req, res){
  User.findOne({name: req.params.name}).then(function(user){
    res.render("users-show", {
      user: user
    });
  });
});

app.post("/users", function(req, res){
  User.create(req.body.user).then(function(user){
    res.redirect("/users/" + user.name);
  });
});

app.post("/users/:name/delete", function(req, res){
  User.findOneAndRemove({name: req.params.name}).then(function(){
    res.redirect("/users")
  });
});

app.post("/users/:name", function(req, res){
  User.findOneAndUpdate({name: req.params.name}, req.body.user, {new: true}).then(function(user){
    res.redirect("/users/" + user.name);
  });
});

app.listen(app.get("port"), function(){
  console.log("Look at me working it!!");
});
