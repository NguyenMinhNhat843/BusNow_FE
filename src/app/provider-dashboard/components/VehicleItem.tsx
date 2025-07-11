import React from "react";
import { ResponseVehicle } from "@/api/DTO/getVehiclesApiDTO";
import { useRouter } from "next/navigation";

interface VehicleItemProps {
  vehicle: ResponseVehicle;
}

const VehicleItem: React.FC<VehicleItemProps> = ({ vehicle }) => {
  // common
  const router = useRouter();

  // handle click create trip
  const handleCreateTrip = () => {
    router.push(`quan-ly-chuyen-di?vehicleId=${vehicle.vehicleId}`);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-all duration-300 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-blue-600">{vehicle.code}</h3>
          <p className="text-sm text-gray-500">
            {vehicle.route.origin.name} → {vehicle.route.destination.name}
          </p>
        </div>
        <div>
          <button
            className="py-2 px-4 rounded-md bg-yellow-400 cursor-pointer hover:bg-yellow-500 transition-all"
            onClick={handleCreateTrip}
          >
            Tạo vé
          </button>
        </div>
        {/* <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${
            vehicle.isActive
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {vehicle.isActive ? "Đang hoạt động" : "Ngưng hoạt động"}
        </span> */}
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 text-sm text-gray-700">
        <div>
          <span className="font-medium text-gray-500">Loại xe:</span>
          <div className="font-semibold">{vehicle.busType}</div>
        </div>
        <div>
          <span className="font-medium text-gray-500">Tổng ghế:</span>
          <div className="font-semibold">{vehicle.totalSeat}</div>
        </div>
        <div>
          <span className="font-medium text-gray-500">Giờ khởi hành:</span>
          <div className="font-semibold">{vehicle.departHour}</div>
        </div>
        <div>
          <span className="font-medium text-gray-500">Thời gian đi:</span>
          <div className="font-semibold">{vehicle.route.duration} giờ</div>
        </div>
        <div>
          <span className="font-medium text-gray-500">Nghỉ tại điểm đến:</span>
          <div className="font-semibold">
            {vehicle.route.restAtDestination} giờ
          </div>
        </div>
        <div>
          <span className="font-medium text-gray-500">Chu kỳ vé:</span>
          <div className="font-semibold">{vehicle.route.repeatsDay} ngày</div>
        </div>
      </div>
    </div>
  );
};

export default VehicleItem;
