export interface ResponseVehicle {
  vehicleId: string;
  code: string; // Biển số xe
  totalSeat: number;
  isActive: boolean;
  busType: "NORMAL" | "VIP"; // Có thể thêm kiểu enum nếu có nhiều loại
  route: {
    routeId: string;
    duration: number;
    restAtDestination: number;
    repeatsDay: number;
  };
  departHour: string; // dạng "HH:mm"
}
