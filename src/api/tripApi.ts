import axiosInstance from "./axiosInstance";
import qs from "qs";

interface RequestGetTripByVehicleId {
  vehicleId: string;
  page?: number;
  limit?: number;
}

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

  async getTripByVehicleId(data: RequestGetTripByVehicleId) {
    const response = await axiosInstance.get("/trip/vehicle", {
      params: {
        ...data,
      },
    });
    return response.data;
  },

  async genTrip(data: any) {
    const response = await axiosInstance.post("/trip/gen-trips", data);
    return response.data;
  },

  async deleteTripsBeforeNow() {
    const response = await axiosInstance.delete(
      "trip/delete-trips-before-date"
    );
    return response.data;
  },
};
