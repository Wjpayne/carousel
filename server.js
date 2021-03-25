const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

app.use(cors());

app.use(express.json());

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

if (process.env.NODE_ENV !== "production") {
  const mongoDB = mongoose.connection;

  mongoDB.on("open", () => {
    console.log("server is connected");
  });

  mongoDB.on("error", (error) => {
    console.log(error);
  });
}

const photoRouter = require("./Routes/Images")

app.use("/photo", photoRouter)

app.get("/", (req, res) => res.send("Hello world!"));

app.listen(port, () => {
  console.log({ port });
});
