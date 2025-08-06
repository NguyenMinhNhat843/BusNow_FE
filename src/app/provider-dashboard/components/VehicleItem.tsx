import React, { useState } from "react";
import { ResponseVehicle } from "@/api/DTO/getVehiclesApiDTO";
import { useRouter } from "next/navigation";

interface VehicleItemProps {
  vehicle: ResponseVehicle;
}

const VehicleItem: React.FC<VehicleItemProps> = ({ vehicle }) => {
  // common
  const router = useRouter();

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-all duration-300 p-5 w-full max-w-md mx-auto">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-blue-600">{vehicle.code}</h3>
        <p className="text-sm text-gray-500">
          {vehicle.route.origin.name} → {vehicle.route.destination.name}
        </p>
      </div>

      <hr className="my-3" />

      {/* Vehicle Info */}
      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Loại xe:</span>
          <span className="font-semibold">{vehicle.busType}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Tổng ghế:</span>
          <span className="font-semibold">{vehicle.totalSeat}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Giờ khởi hành:</span>
          <span className="font-semibold">{vehicle.departHour}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Thời gian đi:</span>
          <span className="font-semibold">{vehicle.route.duration} giờ</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Nghỉ tại điểm đến:</span>
          <span className="font-semibold">
            {vehicle.route.restAtDestination} giờ
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Chu kỳ vé:</span>
          <span className="font-semibold">{vehicle.route.repeatsDay} ngày</span>
        </div>
      </div>
    </div>
  );
};

export default VehicleItem;
