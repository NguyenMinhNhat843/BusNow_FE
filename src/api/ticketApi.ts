import axiosInstance from "./axiosInstance";

export const ticketApi = {
  async createTicket(data: any) {
    const response = await axiosInstance.post("/ticket", data);
    return response.data;
  },
};
