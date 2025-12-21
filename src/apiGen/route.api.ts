import { RouteApi } from "./generated";
import { config, axiosInstance } from "./index";

export const routeApi = new RouteApi(config, "", axiosInstance);
