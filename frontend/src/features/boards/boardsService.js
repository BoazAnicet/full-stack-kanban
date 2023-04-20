import axios from "axios";
const URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1/";

const fetchAllBoards = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await axios
      .get(URL + "boards", config)
      .then((res) => res.data.boards);
    return res;
  } catch (error) {
    console.error(error.message || error);
  }
};

const fetchBoard = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await axios
      .get(`${URL}boards/${id}`, config)
      .then((res) => res.data.board);

    return res;
  } catch (error) {
    console.error(error.message || error);
  }
};

const createBoard = async (board, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios
    .post(`${URL}boards`, board, config)
    .then((res) => res.data);

  return res.newBoard;
};

const editBoard = async (board, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios
    .patch(`${URL}boards/${board._id}`, board, config)
    .then((res) => res.data);

  return res;
};

const deleteBoard = async (board, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios
    .delete(`${URL}boards/${board._id}`, config)
    .then((res) => res.data);

  return res.deletedBoard;
};

const boardService = {
  createBoard,
  fetchAllBoards,
  fetchBoard,
  editBoard,
  deleteBoard,
};

export default boardService;
