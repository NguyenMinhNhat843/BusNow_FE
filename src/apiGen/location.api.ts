import { LocationApi } from "./generated";
import { config, axiosInstance } from "./index";

export const locationApi = new LocationApi(config, "", axiosInstance);
