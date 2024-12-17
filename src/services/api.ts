import axios from "axios";

const API_BASE_URL = "https://api.currencybeacon.com/v1";
const API_KEY = "yOG91SA43cYeakRmkqFDwAcEAAKOas63";

export const fetchCurrencies = async () => {
  const response = await axios.get(`${API_BASE_URL}/currencies`, {
    params: { api_key: API_KEY },
  });
  return response.data.response; // Adjust based on API response structure.
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
  return response.data.response; // Adjust based on API response structure.
};
