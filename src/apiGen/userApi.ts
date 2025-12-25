import { axiosInstance, config } from "./index";
import { UserApi } from "./generated";

export const userApi = new UserApi(config, "", axiosInstance);
