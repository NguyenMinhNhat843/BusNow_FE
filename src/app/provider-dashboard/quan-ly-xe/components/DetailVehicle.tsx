"use client";

import { busApi } from "@/api/busApi";
import { tripApi } from "@/api/tripApi";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { ticketApi } from "@/api/ticketApi";
import TicketItem from "./TicketItem";
import { TabCurrentEnum } from "../enum/TabCurrentEnum";

interface TicketItemProps {
  ticketId: string;
  status: string;
  createdAt: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  seatId: string;
  seatCode: number;
  paymentId: string;
  amount: number;
  paymentTime: string;
  paymentStatus: string;
}

interface DetailVehicleProps {
  vehicleId: string;
  setTabCurrent: any;
}

export default function DetailVehicle({
  vehicleId,
  setTabCurrent,
}: DetailVehicleProps) {
  // state
  const [loading, setLoading] = useState(false);
  const [vehicle, setVehicle] = useState<any>(null);
  const [trips, setTrips] = useState<any[]>([]);
  const [ticketsList, setTicketsList] = useState<TicketItemProps[]>([]);
  const [selectedTripId, setSelectedTripId] = useState<string>("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

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
    if (startTime > endTime) {
      toast.error("Ngày end phải >= ngày start");
      return;
    }

    try {
      setLoading(true);
      const res = await tripApi.genTrip({
        vehicleId,
        startTime,
        endTime,
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

  // fetch tickets
  const onClickTrip = async (tripId: string) => {
    try {
      const res = await ticketApi.findTicketByTrip(tripId);
      setSelectedTripId(tripId);
      if (res.status === "success") {
        setTicketsList(res.data);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  // back to manager vehicle
  const handleBackToManagerVehicle = () => {
    setTabCurrent(TabCurrentEnum.VEHICLE);
  };

  return (
    <div className="bg-white p-6 shadow-md space-y-6">
      {/* button back manager vehicle */}
      <div
        className="cursor-pointer p-2 rounded-full hover:bg-slate-200 w-[10em] flex"
        onClick={handleBackToManagerVehicle}
      >
        <button className="flex gap-2 font-bold text-2xl items-center cursor-pointer justify-between">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeWidth="2.5"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
          <span>Quay lại</span>
        </button>
      </div>
      {/* Thông tin xe */}
      {!loading && vehicle && (
        <div className="">
          {/* Biển số */}
          <div className="flex items-center pb-4">
            <span className="font-bold text-3xl text-blue-600 pe-4">
              {vehicle.code}
            </span>

            {/* Trạng thái */}
            <span
              className={`font-semibold ${
                vehicle.isActive ? "text-green-600" : "text-red-600"
              }`}
            >
              {vehicle.isActive ? "(Đang hoạt động)" : "(Ngưng hoạt động)"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-sm text-gray-700">
            {/* Loại xe */}
            <div className="flex flex-col">
              <span className="text-gray-500 font-medium">Loại xe</span>
              <span className="font-semibold">{vehicle.busType}</span>
            </div>

            {/* Tổng số ghế */}
            <div className="flex flex-col">
              <span className="text-gray-500 font-medium">Tổng số ghế</span>
              <span className="font-semibold">{vehicle.totalSeat}</span>
            </div>

            {/* Giờ khởi hành */}
            <div className="flex flex-col">
              <span className="text-gray-500 font-medium">Giờ khởi hành</span>
              <span className="font-semibold">{vehicle.departHour}</span>
            </div>

            {/* Ngày tạo */}
            <div className="flex flex-col">
              <span className="text-gray-500 font-medium">Ngày tạo</span>
              <span className="font-semibold">
                {new Date(vehicle.createdAt).toLocaleString()}
              </span>
            </div>

            {/* Nếu có tuyến */}
            {vehicle.route && (
              <>
                <div className="flex flex-col">
                  <span className="text-gray-500 font-medium">Tuyến xe</span>
                  <span className="font-semibold">
                    {vehicle.route.origin.name} →{" "}
                    {vehicle.route.destination.name}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-gray-500 font-medium">
                    Thời gian di chuyển
                  </span>
                  <span className="font-semibold">
                    {vehicle.route.duration} giờ
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-gray-500 font-medium">
                    Nghỉ tại điểm đến
                  </span>
                  <span className="font-semibold">
                    {vehicle.route.restAtDestination} giờ
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-gray-500 font-medium">
                    Chu kỳ lặp lại vé
                  </span>
                  <span className="font-semibold">
                    {vehicle.route.repeatsDay} ngày
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Form tạo chuyến */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-blue-600">
          Lên lịch cho các chuyến đi trong:
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:items-end">
          {/* Start time */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Từ ngày
            </label>
            <input
              type="date"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* End time */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Đến ngày
            </label>
            <input
              type="date"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Nút submit */}
          <div className="sm:mt-6">
            <button
              className="bg-blue-600 text-white font-medium px-5 py-2 rounded-md hover:bg-blue-700 transition w-full sm:w-auto"
              disabled={loading}
              onClick={handleCreateTrips}
            >
              {loading ? "Đang tạo..." : "Tạo chuyến"}
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-gray-800">
        Danh sách chuyến đi
      </h2>
      <div className="flex gap-6 ">
        {/* trips lisst */}
        {trips && trips.length > 0 && (
          <div className="space-y-4 min-w-[500px] max-w-[600px] cursor-pointer">
            {trips.map((trip: any) => (
              <div
                key={trip.tripId}
                className={`border rounded-xl p-4 shadow-sm bg-gray-50 hover:shadow-md transition ${
                  selectedTripId === trip.tripId && "bg-yellow-400"
                }`}
                onClick={() => onClickTrip(trip.tripId)}
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
                    <div className="font-medium">
                      {trip.availabelSeat} / {vehicle.totalSeat}
                    </div>
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

        {/* tickets list */}
        <div className="grow border border-slate-700 rounded-md p-4 shadow-lg">
          {ticketsList.length <= 0 && (
            <div className="flex justify-center items-center h-full">
              <p className="text-2xl font-bold text-slate-600 ">
                Không có vé nào
              </p>
            </div>
          )}
          {ticketsList.length > 0 && (
            <div>
              {ticketsList.map((t) => (
                <div key={t.ticketId}>
                  <TicketItem ticket={t} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
