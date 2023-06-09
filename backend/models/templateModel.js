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
        description: String,
        status: { value: String, label: String },
        subtasks: Array,
        id: String,
      },
    ],
    columns: {
      type: [{ name: String, id: String, taskIds: [String] }],
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
