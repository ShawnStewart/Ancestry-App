const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ProfileSchema = new Schema({
  user: {
    type: ObjectId,
    ref: "users"
  },
  name: {
    first: {
      type: String,
      required: true
    },
    middle: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  }
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);
