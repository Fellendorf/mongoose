import { Schema, model } from "mongoose";
import { nameSchema } from "./Name.js";

const userSchema = new Schema(
  {
    name: nameSchema,
    age: {
      type: Number,
      required: true,
      min: 18,
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
    // custom method of the model instance:
    methods: {
      sayHi: function () {
        console.log(`Hi! My name is ${this.name.first} ${this.name.last}`);
      },
    },
  }
);

export const User = model("User", userSchema);

