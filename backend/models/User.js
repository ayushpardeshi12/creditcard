const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  cardnumber: {
    type: String,
    required: true,
  },
  cardHolderName: {
    type: String,
    required: true,
  },
  expmonth: {
    type: String,
    required: true,
  },
  expyear: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
