import "@testing-library/jest-dom";
import { server } from "@/__mocks__/server";
import { beforeAll, afterEach, afterAll } from "vitest";
import axios from "axios";

// Polyfill for `hasPointerCapture` to prevent errors in Radix UI
if (!Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = () => false;
}

// Mock scrollIntoView for JSDOM
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}

// Prevent axios from rejecting promises for non-2xx HTTP status codes
axios.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    // Resolve instead of reject to prevent unhandled errors
    return Promise.resolve(error.response || error);
  }
);

// Establish API mocking before all tests.
beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));

// Reset any request handlers
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
