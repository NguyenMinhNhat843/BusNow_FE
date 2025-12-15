import { tripApi } from "@/api/tripApi";

export const useTrip = () => {
  const handleDeleteTripsBeforeNow = async () => {
    try {
      const response = await tripApi.deleteTripsBeforeNow();
      if (response.status === "success") {
        alert("Xóa thành công");
      }
    } catch (error: any) {
      alert(error?.response?.data?.message || "Có lỗi");
    }
  };

  return {
    handleDeleteTripsBeforeNow,
  };
};
