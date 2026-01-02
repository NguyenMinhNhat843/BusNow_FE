import { axiosInstance, config } from "./index";
import { VNPAYApi } from "./generated";

export const VnpayApi = new VNPAYApi(config, "", axiosInstance);
