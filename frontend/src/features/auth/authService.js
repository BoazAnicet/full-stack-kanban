import axios from "axios";

const API_URL = "http://localhost:3001/api/v1/users";

const register = async (userData) => {
  const res = await axios.post(API_URL, userData);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

const login = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

const logout = async () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
