"use client";

import { busApi } from "@/api/busApi";
import { tripApi } from "@/api/tripApi";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import VehicleItem from "../components/VehicleItem";

interface CreateTripFormProps {
  vehicleId: string;
  onTripCreated?: () => void; // callback sau khi tạo thành công (nếu cần)
}

export default function ManagerTripPage() {
  // common
  const searchparams = useSearchParams();
  // Lấy vehicleId từ query
  const vehicleId = searchparams.get("vehicleId");

  // state
  const [days, setDays] = useState(10);
  const [loading, setLoading] = useState(false);
  const [vehicle, setVehicle] = useState<any>(null);
  const [trips, setTrips] = useState<any[]>([]);

  // fetch vehicle info
  useEffect(() => {
    const fetchVehicleInfo = async () => {
      setLoading(true);
      try {
        const response = await busApi.getVehicles({ vehicleId: vehicleId });
        if (response.status === "success") {
          setVehicle(response.data);
        }
      } catch (error: any) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleInfo();
  }, []);

  // gen trip
  const handleCreateTrips = async () => {
    if (days <= 0) {
      toast.error("Số ngày phải lớn hơn 0");
      return;
    }

    try {
      setLoading(true);
      const res = await tripApi.genTrip({
        vehicleId,
        time: days,
        price: 250000,
      });

      if (res.status === "success") {
        toast.success("Tạo chuyến thành công!");
      }
    } catch (err) {
      toast.error((err as Error).message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  // fetchTrip
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await tripApi.getTripByVehicleId({
          vehicleId: vehicleId as string,
        });
        setTrips(res.trips);
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    };

    if (vehicleId) {
      fetchTrips();
    }
  }, []);

  if (!vehicleId) {
    return <div>Vui lòng chọn vehicle</div>;
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md space-y-6 max-w-3xl mx-auto">
      {/* Thông tin xe */}
      {!loading && vehicle && (
        <div>
          <h2 className="text-xl font-bold text-blue-600 mb-4">Thông tin xe</h2>

          <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm text-gray-700">
            {/* Thông tin cơ bản */}
            <div>
              <span className="text-gray-500">Biển số:</span>
              <div className="font-semibold">{vehicle.code}</div>
            </div>

            <div>
              <span className="text-gray-500">Loại xe:</span>
              <div className="font-semibold">{vehicle.busType}</div>
            </div>

            <div>
              <span className="text-gray-500">Tổng số ghế:</span>
              <div className="font-semibold">{vehicle.totalSeat}</div>
            </div>

            <div>
              <span className="text-gray-500">Giờ khởi hành:</span>
              <div className="font-semibold">{vehicle.departHour}</div>
            </div>

            <div>
              <span className="text-gray-500">Trạng thái:</span>
              <div
                className={`font-semibold ${
                  vehicle.isActive ? "text-green-600" : "text-red-600"
                }`}
              >
                {vehicle.isActive ? "Đang hoạt động" : "Ngưng hoạt động"}
              </div>
            </div>

            <div>
              <span className="text-gray-500">Ngày tạo:</span>
              <div className="font-semibold">
                {new Date(vehicle.createdAt).toLocaleString()}
              </div>
            </div>

            {/* Thông tin tuyến */}
            {vehicle.route && (
              <>
                <div>
                  <span className="text-gray-500">Tuyến xe:</span>
                  <div className="font-semibold">
                    {vehicle.route.origin.name} →{" "}
                    {vehicle.route.destination.name}
                  </div>
                </div>

                <div>
                  <span className="text-gray-500">Thời gian di chuyển:</span>
                  <div className="font-semibold">
                    {vehicle.route.duration} giờ
                  </div>
                </div>

                <div>
                  <span className="text-gray-500">Nghỉ tại điểm đến:</span>
                  <div className="font-semibold">
                    {vehicle.route.restAtDestination} giờ
                  </div>
                </div>

                <div>
                  <span className="text-gray-500">Chu kỳ lặp lại vé:</span>
                  <div className="font-semibold">
                    {vehicle.route.repeatsDay} ngày
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Form tạo chuyến */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Tạo chuyến xe mới
        </h2>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Lên vé trước bao nhiêu ngày
            </label>
            <input
              type="number"
              min={1}
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              placeholder="VD: 10"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            className="bg-blue-600 text-white font-medium px-5 py-2 rounded-md hover:bg-blue-700 transition w-full sm:w-auto"
            disabled={loading}
            onClick={handleCreateTrips}
          >
            {loading ? "Đang tạo..." : "Tạo chuyến"}
          </button>
        </div>
      </div>

      {/* trips lisst */}
      {trips && trips.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Danh sách chuyến xe
          </h2>

          {trips.map((trip: any) => (
            <div
              key={trip.tripId}
              className="border rounded-xl p-4 shadow-sm bg-gray-50 hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-blue-600 font-bold text-base">
                  Chuyến {trip.type === "go" ? "đi" : "về"} –{" "}
                  {trip.vehicle.code}
                </h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    trip.tripStatus === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : trip.tripStatus === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {trip.tripStatus}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 text-sm text-gray-700">
                <div>
                  <span className="text-gray-500">Ngày khởi hành:</span>
                  <div className="font-medium">
                    {new Date(trip.departDate).toLocaleString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </div>
                </div>

                <div>
                  <span className="text-gray-500">Giá vé:</span>
                  <div className="font-medium">
                    {trip.price.toLocaleString("vi-VN")} đ
                  </div>
                </div>

                <div>
                  <span className="text-gray-500">Ghế còn lại:</span>
                  <div className="font-medium">{trip.availabelSeat}</div>
                </div>

                <div>
                  <span className="text-gray-500">Loại xe:</span>
                  <div className="font-medium">{trip.vehicle.busType}</div>
                </div>

                <div>
                  <span className="text-gray-500">Giờ xuất phát:</span>
                  <div className="font-medium">{trip.vehicle.departHour}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
