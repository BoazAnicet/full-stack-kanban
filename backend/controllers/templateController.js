const Template = require("../models/templateModel");

exports.createTemplate = async (req, res) => {
  try {
    const newTemplate = await Template.create({ ...req.body });

    return res.status(201).json({ newTemplate });
  } catch (error) {
    return res.status(401).json({ message: "Unable to create template." });
  }
};

exports.fetchAllTemplates = async (req, res) => {
  try {
    const templates = await Template.find({});

    return res.status(200).json({ templates });
  } catch (error) {
    return res.status(401).json({ message: "No templates found." });
  }
};
