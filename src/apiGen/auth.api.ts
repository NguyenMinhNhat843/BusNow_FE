import { AuthApi } from "./generated";
import { config, axiosInstance } from "./index";

export const authApi = new AuthApi(config, "", axiosInstance);
