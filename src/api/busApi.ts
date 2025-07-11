import axiosInstance from "./axiosInstance";

export const busApi = {
  async getVehicles(data: any) {
    const response = await axiosInstance.get("/vehicle/list", {
      params: { ...data },
    });
    return response.data;
  },

  async createVehicle(data: any) {
    const response = await axiosInstance.post("/vehicle/create", data);
    return response.data;
  },
};
