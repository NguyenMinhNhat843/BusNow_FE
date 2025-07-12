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

  async getSPByRoute(routeId: string) {
    const res = await axiosInstance.get(`/stop-point/by-route/${routeId}`);
    return res.data;
  },
};
