const mongoose = require("mongoose");
require("dotenv").config(); // to load environment variables from .env file
// Connection URL
const url = process.env.MONGO_DB_CONNECTION_URL;

const connectDB = async () => {
    console.log(url)
  await mongoose.connect(url);
};

module.exports = {
  connectDB,
};
