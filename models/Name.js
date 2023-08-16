import { Schema, model } from "mongoose";

const nameSchema = new Schema({
  first: {
    type: String,
    required: true,
  },
  last: String,
});

const Name = model("Name", nameSchema);

export { nameSchema, Name };

