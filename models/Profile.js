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
  },
  birthday: Date,
  gender: {
    type: String,
    required: true
  },
  nationality: String,
  ethnicity: String,
  metric: {
    type: Boolean,
    default: false
  },
  height: Number,
  weight: Number,
  bio: String,
  parents: {
    mother: {
      type: ObjectId,
      ref: profiles
    },
    father: {
      type: ObjectId,
      ref: profiles
    }
  },
  children: [
    {
      type: ObjectId,
      ref: profiles
    }
  ]
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);
