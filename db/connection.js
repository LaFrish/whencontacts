var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
  }
);
mongoose.model("User", UserSchema);
if(process.env.NODE_ENV == "production"){
  mongoose.connect(process.env.MONGOLAB_URL);
}else{
mongoose.connect("mongodb://localhost/cornerstone");
}
module.exports = mongoose;
