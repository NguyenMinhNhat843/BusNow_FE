import { axiosInstance, config } from "./index";
import { VehicleApi } from "./generated";

export const vehicleApi = new VehicleApi(config, "", axiosInstance);
