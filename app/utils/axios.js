const axiosInstance = require("axios");
let axios = axiosInstance.create({
  baseURL: process.env.API_URL || "localhost:8091",
  headers: {
    Authorization: "Bearer",
  },
});

module.exports = axios;
