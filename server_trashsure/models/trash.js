const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const TrashSchema = new Schema({
  path: {
    type: String,
    required: [true, "Image must be taken"]
  },
  coordinate: String,
  address: String,
  title: String,
  description: String,
  type: String,
  prediction: Array,
  createdAt: Date,
  userID: { type: Schema.Types.ObjectId, ref: "User" }
});

const Trash = mongoose.model("Trash", TrashSchema);

module.exports = Trash;
