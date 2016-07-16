var express = require("express");
var parser = require("body-parser");
var hbs     = require("express-handlebars");
var mongoose = require("./db/connection");

var app     = express();

var Contact = mongoose.model("Contact");

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

app.get("/contacts", function(req, res){
  Contact.find({}).then(function(contacts){
    res.render("contacts-index", {
      contacts: contacts
    });
  });
});

app.get("/contacts/:name", function(req, res){
  Contact.findOne({name: req.params.name}).then(function(contact){
    res.render("contacts-show", {
      contact: contact
    });
  });
});

app.post("/contacts", function(req, res){
  Contact.create(req.body.contact).then(function(contact){
    res.redirect("/contacts/" + contact.name);
  });
});

app.post("/contacts/:name/delete", function(req, res){
  Contact.findOneAndRemove({name: req.params.name}).then(function(){
    res.redirect("/contacts")
  });
});

app.post("/contacts/:name", function(req, res){
  Contact.findOneAndUpdate({name: req.params.name}, req.body.contact, {new: true}).then(function(contact){
    res.redirect("/contacts/" + contact.name);
  });
});

app.listen(app.get("port"), function(){
  console.log("Look at me working it!!");
});
