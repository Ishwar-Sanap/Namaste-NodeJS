const mongoose = require("mongoose");
const validator = require("validator"); //Using validator library for data validations
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // npm package to hash password..
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
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Invalid email address");
      },
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
      validate(value) {
        if (!validator.isURL(value)) throw new Error("Photo url is not valid");
      },
    },
    skills: {
      type: [String],
    },
    about: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.getJWT = function () {
  //Not in userSchema methods always use noraml function, since we required this
  // and this can't be used in arrow function
  const user = this;
  const token = jwt.sign({ userID: user._id }, "SecreateCode@123", {
    expiresIn: "1d",
  }); // userID is encoded and stored the the jwtToken string

  return token;
};

userSchema.methods.validatePassword = async function (userEnterPassword) {
  const user = this;
  const hashPassword = user.password;
  const isValidPassword = await bcrypt.compare(userEnterPassword, hashPassword);
  return isValidPassword;
};
module.exports = mongoose.model("User", userSchema);
