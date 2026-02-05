const mongoose = require("mongoose");

//https://mongoosejs.com/docs/schematypes.html

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 20,
    },
    lastName: {
      type: String,
      trim: true,
      maxLength: 20,
    },
    emailID: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value.toLowerCase()))
          throw new Error("Gender data (" + value + ") invalid.");
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    profilePhotoUrl: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
