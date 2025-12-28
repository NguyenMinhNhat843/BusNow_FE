import { RefundRequestApi } from "./generated";
import { config, axiosInstance } from "./index";

export const refundRequestApi = new RefundRequestApi(config, "", axiosInstance);
