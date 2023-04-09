const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Title is reqired."],
    },
    tasks: {
      type: Array,
    },
    columns: {
      type: Array,
    },
    columnOrder: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Board = mongoose.model("Board", boardSchema);
