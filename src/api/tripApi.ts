import axiosInstance from "./axiosInstance";
import qs from "qs";

export const tripApi = {
  async searchTrips(parmas: any) {
    const response = await axiosInstance.get("/trip/search-trip", {
      params: parmas,
      paramsSerializer: (params) => {
        return qs.stringify(params, {
          arrayFormat: "repeat", // Để gửi mảng dưới dạng nhiều tham số
        });
      },
    });
    return response.data;
  },
};
