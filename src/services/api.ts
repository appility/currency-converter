import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchCurrencies = async () => {
  const response = await axios.get(`${API_BASE_URL}/currencies`, {
    params: { api_key: API_KEY },
  });
  return response.data.response;
};

export const fetchConvertedValue = async (from: string, to: string, amount: number) => {
  const response = await axios.get(`${API_BASE_URL}/convert`, {
    params: {
      api_key: API_KEY,
      from,
      to,
      amount,
    },
  });
  return response.data.response;
};
