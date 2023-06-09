const Board = require("../models/boardModel");

exports.createBoard = async (req, res) => {
  try {
    const newBoard = await Board.create({ ...req.body, user: req.user.id });

    return res.status(201).json({ newBoard });
  } catch (error) {
    return res.status(401).json({ message: "Unable to create board." });
  }
};

exports.fetchAllBoards = async (req, res) => {
  try {
    const boards = await Board.find({ user: req.user.id });

    return res.status(200).json({ boards });
  } catch (error) {
    return res.status(401).json({ message: "No boards found." });
  }
};

exports.fetchBoard = async (req, res) => {
  const board = await Board.findById(req.params.id);

  if (!board) {
    return res.status(400).json({ message: "Board not found" });
  }

  // Check for user
  if (!req.user) {
    return res.status(401).json({ message: "User not found" });
  }

  // Make sure the logged in user matches the board.user
  if (board.user.toString() !== req.user.id) {
    return res.status(401).json({ message: "User not authorized" });
  }

  return res.status(200).json({ board });
};

exports.editBoard = async (req, res) => {
  const board = await Board.findById(req.params.id);

  if (!board) {
    return res.status(400).json({ message: "Board not found" });
  }

  // Check for user
  if (!req.user) {
    return res.status(401).json({ message: "User not found" });
  }

  // Make sure the logged in user matches the board.user
  if (board.user.toString() !== req.user.id) {
    return res.status(401).json({ message: "User not authorized" });
  }

  const updatedBoard = await Board.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json(updatedBoard);
};

exports.deleteBoard = async (req, res) => {
  const board = await Board.findById(req.params.id);

  if (!board) {
    return res.status(400).json("Board not found");
  }

  // Check for user
  if (!req.user) {
    return res.status(401).json({ message: "User not found" });
  }

  // Make sure the logged in user matches the board user
  if (board.user.toString() !== req.user.id) {
    return res.status(401).json({ message: "User not authorized" });
  }

  const deletedBoard = await Board.findByIdAndDelete(req.params.id);

  return res.status(200).json({ message: "Board deleted.", deletedBoard });
};
