import axios from "axios";

/**
 * Is the main instance of axios. Use as a main API of axios.
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});
