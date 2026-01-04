import { Configuration } from "./generated";
import { axiosInstance } from "./axios";

const config = new Configuration({
  basePath: "http://localhost:3000",
  // basePath: "https://busnow-be.onrender.com",
});

export { config, axiosInstance };
