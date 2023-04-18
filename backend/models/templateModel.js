const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is reqired."],
    },
    tasks: [
      {
        title: String,
        descriptions: String,
        status: { value: String, label: String },
        subtasks: Array,
        id: String,
      },
    ],
    columns: {
      type: [String],
    },
    columnOrder: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Template = mongoose.model("Template", templateSchema);
