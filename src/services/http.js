import axios from "axios";
import LocalStorage from "../utils/localstorage";

const ls = new LocalStorage();

// Request interceptor - add authorization header to every request
axios.interceptors.request.use((config) => {
   if(config.url.indexOf("/auth") !== -1) return config;

   injectAuthHeader(config.headers);
   return config;
}, (err) => {
   return Promise.reject(err);
});

/**
 * Make an api request to the backend server
 * @param {string} endpoint - api request endpoint
 * @param {object} options - api request options {e.g method: "POST"}
 */
export default async function httpRequest(endpoint, { method, ...options }) {
   try {
      if (!endpoint || typeof endpoint !== "string") throw new Error("Error: invalid endpoint");

      const response = await axios({
         method: method || "GET",
         url: endpoint,
         baseURL: process.env.REACT_APP_API_BASE_URL,
         withCredentials: true,
         ...options
      });

      return response;
   } catch(err) {
      if(err.response) {
         // console.log(`Error: ${JSON.stringify(err.response.data)}`);
         throw new Error(err);
      }
      throw new Error(err);
   }
}

/**
 * Injects the authorization header on outgoing request to protected routes
 * @param {object} headers - AxiosRequestConfig.headers [request headers]
 */
export const injectAuthHeader = (headers) => {
   const { token } = ls.get("user") || {};

   if(!token) {
      console.warn("[WARNING]: no auth token found");
      return;
   }

   headers["Authorization"] = `Bearer ${token}`;
}