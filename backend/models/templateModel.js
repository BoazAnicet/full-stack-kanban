const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema(
  {
    // title: {
    //   type: String,
    //   required: [true, "Title is reqired."],
    // },
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

module.exports = Template = mongoose.model("Template", templateSchema);
