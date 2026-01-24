const { MongoClient } = require("mongodb"); // mongodb is npm package to interact with MongoDB database.
//There is mongoose package also we can use for connecting databse for building large scle apps

require("dotenv").config(); // to load environment variables from .env file

// Connection URL
const url = process.env.MONGO_DB_CONNECTION_URL;
const client = new MongoClient(url);

// Database Name
const dbName = "HelloWord";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to DB server");

  const db = client.db(dbName);
  const collection = db.collection("User");

  //CRUD Operations
  //Create, Read , update, Delete

  //   const newUser = {
  //     name: "John",
  //     email: "John@gmail.com",
  //     city: "Beed",
  //   };

  //   //Create
  //   const insertedUser = await collection.insertOne(newUser);
  //   console.log("Inserted document", insertedUser);

  //Update document
  const updateResult = await collection.updateOne(
    { email: "ankur02@gmail.com" },
    { $set: { city: "Mumbai" } },
  );
  console.log("Updated documents =>", updateResult);

  //Delete document
  const deletedResult = await collection.deleteOne({ name: "Akshay" });
  console.log("Deleted document", deletedResult);

  //Read query that returns all the documents.
  const findResult = await collection.find({}).toArray();
  console.log("All documents =>", findResult);

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
