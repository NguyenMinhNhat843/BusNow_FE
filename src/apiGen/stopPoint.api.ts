import { StopPointApi } from "./generated";
import { config, axiosInstance } from "./index";

export const stopPointApi = new StopPointApi(config, "", axiosInstance);
