import axiosInstance from "./axiosInstance";
import { requestFilterTicketApi } from "./DTO/ticketApiDto";

export const ticketApi = {
  async createTicket(data: any) {
    const response = await axiosInstance.post("/ticket", data);
    return response.data;
  },

  async getMyTickets() {
    const response = await axiosInstance.get("ticket/my-ticket");
    return response.data;
  },

  async filterTickets(data: requestFilterTicketApi) {
    // Xử lý dữ liệu, bỏ các filed rỗng hoặc không có:
    const cleanedData: requestFilterTicketApi = {
      numberPerPage: data.numberPerPage,
      page: data.page,
    };

    if (data.userId?.trim()) {
      cleanedData.userId = data.userId.trim();
    }

    if (data.time?.startTime?.trim() || data.time?.endTime?.trim()) {
      cleanedData.time = {};
      if (data.time.startTime?.trim()) {
        cleanedData.time.startTime = data.time.startTime.trim();
      }
      if (data.time.endTime?.trim()) {
        cleanedData.time.endTime = data.time.endTime.trim();
      }
    }

    if (data.ticketStatus?.trim()) {
      cleanedData.ticketStatus = data.ticketStatus;
    }

    if (data.sortBy?.trim()) {
      cleanedData.sortBy = data.sortBy;
    }

    const response = await axiosInstance.post(
      "/ticket/filter-ticket",
      cleanedData
    );
    return response.data;
  },

  async findTicketByTrip(tripId: string) {
    const response = await axiosInstance.get(`/ticket/by-trip/${tripId}`);
    return response.data;
  },

  async findTicketByPhone(phone: string) {
    const response = await axiosInstance.get(`/ticket/by-phone/${phone}`);
    return response.data;
  },

  async cancleTicket(ticketId: string, bankingInfo: any) {
    const response = await axiosInstance.put(
      `/ticket/send-mail-cancle-ticket`,
      {
        ticketId,
        bankingInfo,
      }
    );
    return response.data;
  },
};
