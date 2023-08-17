import { connect as connectToMongo } from "mongoose";
import Promise from "bluebird";
import { User } from "../models/User.js";
import { users } from "../mock/users.js";

// connect to the database
await connectToMongo("mongodb://localhost:37017/mongoose", {
  connectTimeoutMS: 1000,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log(e.message);
    process.exit();
  });

// delete previously created users
await User.deleteMany({});

// insert users in the database
await Promise.mapSeries(users, (user, i) =>
  User.create(user).catch((e) => {
    console.log(`User N${i + 1} wasn't inserted. Reason: ${e.message}`);
  })
);

// get a user using JSON doc (standard mongo queries syntax)
const artsiom = await User.findOne({
  "name.first": "Artsiom",
  "name.last": /fin/i,
  age: { $gte: 18, $lt: 66 },
})
  .sort({ createdAt: -1 })
  .select({ "name._id": 0 });

// get a user using query builder (mongoose feature)
const katrin = await User.findOne({})
  .where("name.first")
  .equals("Katrin")
  .where("name.last")
  .regex(/fin/i)
  .where("age")
  .gt(18)
  .lt(66);

// use a custom "method" function of the model instance
artsiom.sayHi();
katrin.sayHi();

// use a custom "static" function of the model class
const anfisa = await User.findByFirstName("Anfisa");
anfisa.sayHi();

// use a custom "query helper" function of the model class
const tihon = await User.find().byFirstName("Tihon");
tihon.sayHi();

// use a custom "virtual" property of the model instance
console.log(artsiom.fullName);
console.log(katrin.emailedName);

// change user and "save" it (middleware usage)
artsiom.email = "artsiom@google.com";
await artsiom.save();

process.exit();

