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
  User.create(user)
    .then(() => {
      console.log(`User N${i} was inserted`);
    })
    .catch((e) => {
      console.log(`User N${i} wasn't inserted. Reason: ${e.message}`);
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

// use a custom method of the model instance
artsiom.sayHi();
katrin.sayHi();

