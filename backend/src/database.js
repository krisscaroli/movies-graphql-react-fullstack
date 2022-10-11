import mongoose from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1/FilmsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.log(err));
