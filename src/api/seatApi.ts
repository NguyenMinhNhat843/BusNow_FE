import axiosInstance from "./axiosInstance";

export const seatApi = {
  async getSeatIsBookedByTripId(tripId: string) {
    const response = await axiosInstance.get(
      "/seat/get-seat-is-booked-by-trip-id",
      {
        params: { tripId },
      }
    );
    return response.data;
  },
};
