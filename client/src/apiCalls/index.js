import axios from "axios";
// axios is a promise-based HTTP client for the browser and node.js
// axios is used to make API calls to the server

// axiosInstance is an instance of axios that has the base URL set to the server's URL
export const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json", // this is the type of data you're sending
  },
});
