import axiosInstance from "./axiosInstance";

export const locationApi = {
  async getAllLocation() {
    const response = await axiosInstance.get("/location/get-all");
    return response.data;
  },

  async getListLocationDeatil(locationKeyword: string) {
    const response = await axiosInstance.get("/location/get-location-detail", {
      params: { locationKeyword },
    });
    return response.data;
  },
};
