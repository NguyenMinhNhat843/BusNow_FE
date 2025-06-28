import axiosInstance from "./axiosInstance";

export const tripApi = {
  async searchTrips(parmas: any) {
    const response = await axiosInstance.get("/trip/search-trip", {
      params: parmas,
    });
    return response.data;
  },
};
