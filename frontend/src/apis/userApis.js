import axios from "axios";

export const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    if (response) {
      return response.data;
    }
  } catch (error) {
    throw new Error(`Error fetching data from ${url}: ${error.message}`);
  }
};

export const postData = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    throw new Error(`Error posting data to ${url}: ${error.message}`);
  }
};
