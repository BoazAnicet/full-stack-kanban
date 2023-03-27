import axios from "axios";
const URL = "http://localhost:3001/api/v1/posts";

const fetchPosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await axios.get(URL).then((res) => res.data.posts);
    return res;
  } catch (error) {
    console.error(error.message || error);
  }
};

const createPost = async (post, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(`${URL}/new`, post, config).then((res) => res.data);

  return res.newPost;
};

const deletePost = async (post_id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.delete(`${URL}/${post_id}`, config).then((res) => res.data);

  return res.deletedPost._id;
};

const fetchPost = async (post_id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(`${URL}/${post_id}`).then((res) => res.data);
  return res.post;
};

const editPost = async (post, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.patch(`${URL}/edit/${post._id}`, post, config).then((res) => res.data);

  return res;
};

const postService = {
  createPost,
  fetchPosts,
  deletePost,
  fetchPost,
  editPost,
};

export default postService;
