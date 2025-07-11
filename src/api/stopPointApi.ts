import axiosInstance from "./axiosInstance";

export const stopPointApi = {
  async getStopPintBycityId(cityId: string) {
    const response = await axiosInstance.get("/stop-point", {
      params: {
        cityId,
      },
    });
    return response.data;
  },
};
