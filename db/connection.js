var mongoose = require("mongoose");

var ContactSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
  }
);
mongoose.model("Contact", ContactSchema);
if(process.env.NODE_ENV == "production"){
  mongoose.connect(process.env.MONGOLAB_URL);
}else{
mongoose.connect("mongodb://localhost/whencontacts");
}
module.exports = mongoose;
