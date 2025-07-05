import axiosInstance from "./axiosInstance";

export const ticketApi = {
  async createTicket(data: any) {
    const response = await axiosInstance.post("/ticket", data);
    return response.data;
  },

  async getMyTickets() {
    const response = await axiosInstance.get("ticket/my-ticket");
    return response.data;
  },
};
