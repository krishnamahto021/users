const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    id: {
      type: Number,
    },
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    gender: { type: String },
    avatar: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
    },
    domain: { type: String },
    available: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
