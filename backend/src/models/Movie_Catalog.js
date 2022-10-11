import { Schema, model } from "mongoose";

const moviecatalogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  likes: Number,
  userCreated: String,
});

export default model("Movie_Catalog", moviecatalogSchema);
