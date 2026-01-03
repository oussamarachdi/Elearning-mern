const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true
  },
  bio: String,
  country: String,
  avatar: String,
  skills: [String]
}, { timestamps: true });

module.exports = mongoose.model("Profile", profileSchema);
