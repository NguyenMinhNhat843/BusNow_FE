import { BusCompanyRequestApi } from "./generated";
import { config, axiosInstance } from "./index";

export const busCompanyRequestApi = new BusCompanyRequestApi(
  config,
  "",
  axiosInstance
);
