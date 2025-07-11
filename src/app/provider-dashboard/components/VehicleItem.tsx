import React from "react";
import { ResponseVehicle } from "@/api/DTO/getVehiclesApiDTO";

interface VehicleItemProps {
  vehicle: ResponseVehicle;
}

const VehicleItem: React.FC<VehicleItemProps> = ({ vehicle }) => {
  return (
    <div className="border rounded-xl shadow-md p-4 bg-white hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-blue-600">{vehicle.code}</h3>
        <span
          className={`text-sm px-2 py-1 rounded-full ${
            vehicle.isActive
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {vehicle.isActive ? "Đang hoạt động" : "Ngưng hoạt động"}
        </span>
      </div>

      <div className="text-sm text-gray-700 space-y-1">
        <div>
          <strong>Loại xe:</strong> {vehicle.busType}
        </div>
        <div>
          <strong>Tổng ghế:</strong> {vehicle.totalSeat}
        </div>
        <div>
          <strong>Giờ khởi hành:</strong> {vehicle.departHour}
        </div>
        <div>
          <strong>Thời gian đi:</strong> {vehicle.route.duration} giờ
        </div>
        <div>
          <strong>Thời gian nghỉ tại điểm đến:</strong>{" "}
          {vehicle.route.restAtDestination} giờ
        </div>
        <div>
          <strong>Lặp lại trong tuần:</strong> {vehicle.route.repeatsDay}{" "}
          ngày/tuần
        </div>
      </div>
    </div>
  );
};

export default VehicleItem;
