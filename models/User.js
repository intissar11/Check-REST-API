const mongoose = require("mongoose");
Schema = mongoose.Schema;
const User = new Schema({
  name: String,
  email: { type: String, require: true },
  password: String,
});
module.exports = mongoose.model("Schema", User);
