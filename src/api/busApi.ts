import axiosInstance from "./axiosInstance";

export const busApi = {
  async getVehicles(page: number, limit: number) {
    const response = await axiosInstance.get("/vehicle/list", {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  },
};
