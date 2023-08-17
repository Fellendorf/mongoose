import { Schema, model } from "mongoose";
import { nameSchema } from "./Name.js";

const userSchema = new Schema(
  {
    name: nameSchema,
    age: {
      type: Number,
      required: true,
      min: 1,
      max: 80,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      // Custom validator:
      validate: {
        validator: (value) =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value),
        message: ({ value }) => `"${value}" is incorrect email`,
      },
    },
    createdAt: {
      type: Date,
      default: () => Date.now(),
      immutable: true,
    },
    updatedAt: {
      type: Date,
      default: () => Date.now(),
    },
  },
  {
    // custom "method" function of the model instance
    // https://mongoosejs.com/docs/guide.html#methods
    methods: {
      sayHi() {
        console.log(`Hi! My name is ${this.name.first} ${this.name.last}`);
      },
      sayUpdated() {
        console.log(
          `User ${this.name.first} ${this.name.last} was created/updated`
        );
      },
    },
    // custom "static" function of the model
    // https://mongoosejs.com/docs/guide.html#statics
    statics: {
      findByFirstName(firstName) {
        return this.findOne().where("name.first").equals(firstName);
      },
    },
    // custom "query helper" function of the model
    // https://mongoosejs.com/docs/guide.html#query-helpers
    query: {
      byFirstName(firstName) {
        return this.findOne().where("name.first").equals(firstName);
      },
    },
    // custom "virtual" property of the model instance
    // https://mongoosejs.com/docs/guide.html#virtuals
    virtuals: {
      fullName: {
        get() {
          return `${this.name.first} ${this.name.last}`;
        },
      },
      emailedName: {
        get() {
          return `${this.name.first} ${this.name.last} <${this.email}>`;
        },
      },
    },
  }
);

// "pre" middleware on "save"
// https://mongoosejs.com/docs/middleware.html#pre
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// "post" middleware on "save"
// https://mongoosejs.com/docs/middleware.html#post
userSchema.post("save", (doc, next) => {
  doc.sayUpdated();
  next();
});

export const User = model("User", userSchema);

