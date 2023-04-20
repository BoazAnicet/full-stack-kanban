import axios from "axios";
const URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1/";

const fetchAllTemplates = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await axios
      .get(URL + "templates", config)
      .then((res) => res.data.templates);
    return res;
  } catch (error) {
    console.error(error.message || error);
  }
};

const boardTemplatesService = {
  fetchAllTemplates,
};

export default boardTemplatesService;
