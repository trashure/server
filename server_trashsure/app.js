require("dotenv").config();
const express = require("express"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  app = express(),
  port = process.env.PORT || 3000;

const userRoute = require("./routers/userRoute"),
  trashRoute = require("./routers/trashRoute");

// mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, { useNewUrlParser: true });
// mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME_TEST}`, { useNewUrlParser: true });
mongoose.connect(`mongodb+srv://adip:adip@clusterhack0verflow-z6vaw.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true })

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// R O U T I N G
app.use("/user", userRoute);
app.use("/", trashRoute);

app.listen(port, () => console.log(`Listen on port ${port}`));
module.exports = app;