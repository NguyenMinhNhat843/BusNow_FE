import axiosInstance from "./axiosInstance";
import { RequestCreateRoute, RequestGetRoutes } from "./DTO/routeApiDTO";

export const routeApi = {
  async createRoute(data: any) {
    const response = await axiosInstance.post("/route/create", data);
    return response.data;
  },

  async getRoutes(page: number, limit: number) {
    console.log(page, limit);
    const response = await axiosInstance.get("/route/list", {
      params: { page, limit },
    });
    return response.data;
  },
};
