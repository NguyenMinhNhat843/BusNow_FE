import { TripApi } from "./generated";
import { config, axiosInstance } from "./index";

export const tripApi = new TripApi(config, "", axiosInstance);
