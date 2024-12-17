import { http, HttpResponse } from "msw";
import mockCurrencies from "./data/mockCurrencies.json";
import mockConversion from "./data/mockConversion.json";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const handlers = [
  // Mock for fetching currencies
  http.get(`${API_BASE_URL}/currencies`, async () => {
    return HttpResponse.json(mockCurrencies, { status: 200 });
  }),

  // Mock for fetching conversion rates
  http.get(`${API_BASE_URL}/convert`, async ({ request }) => {
    const url = new URL(request.url);
    const from = url.searchParams.get("from");
    const to = url.searchParams.get("to");

    // Simulate an error response
    if (from !== "USD" || to !== "EUR") {
      return new HttpResponse(
        JSON.stringify({ error: "Conversion failed" }), // Proper error message
        { status: 500 } // Return a non-2xx HTTP status
      );
    }
    return HttpResponse.json(mockConversion, { status: 200 });
  }),
];
