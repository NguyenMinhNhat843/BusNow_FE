import { BusTypeEnum } from "@/api/Enum/BusTypeEnum";
import Image from "next/image";
import format from "@/utils/format";
import { useState } from "react";
import { stopPointApi } from "@/api/stopPointApi";
import { useRouter } from "next/navigation";
import DetailInfo from "./StopPoint";
import SeatMapModel from "./SeatMapUI";
import { Button, Paper } from "@mantine/core";

export interface TripResponse {
  tripId: string;
  routeId: string;
  price: number;
  availableSeat: number;
  totalSeat: number;
  codeNumber: string;
  vehicleName: string;
  busType: "VIP" | "STANDARD" | "LIMOUSINE"; // hoặc: BusTypeEnum nếu bạn đã định nghĩa enum
  fromId: string;
  fromname: string;
  departTime: string; // kiểu tùy thuộc bạn dùng Date hay ISO string
  toId: string;
  toName: string;
  arriveTime: string;
  type: "return" | "go";
  avatar: string;
}

export interface StopPointInterface {
  name: string;
  address: string;
  city: {
    name: string;
    id: string;
  };
}

// =================================== UI chính hiển thị thông tin trip ==========================================
export default function TripItem({ trip }: { trip: TripResponse }) {
  const {
    tripId,
    routeId,
    price,
    availableSeat,
    totalSeat,
    codeNumber,
    vehicleName,
    busType,
    fromId,
    fromname,
    toId,
    toName,
    arriveTime,
    departTime,
    type,
    avatar,
  } = trip;
  const router = useRouter();

  const [tabSelected, setTabSelected] = useState<string>("stop-point");
  const [openModelBooking, setOpenModelBooking] = useState<boolean>(false);
  const [stopPoints, setStopPoints] = useState<any[]>([]);

  const fetchSP = async () => {
    try {
      const res = await stopPointApi.getSPByRoute(routeId);
      if (res.status === "success") {
        setStopPoints(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnClickBooking = async () => {
    setOpenModelBooking(!openModelBooking);
    if (stopPoints.length <= 0) {
      await fetchSP();
    }
  };

  return (
    <Paper
      shadow="sm"
      radius="md"
      p="md"
      withBorder
      className="mb-4 transition-all hover:shadow-xl"
    >
      {/* Base info */}
      <div className="flex items-center gap-4">
        {/* Vehicle Image */}
        <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-md">
          <Image
            src={avatar}
            alt="avatar vehicle"
            fill
            className="object-cover"
          />
        </div>

        {/* Trip Info */}
        <div className="flex flex-col justify-between flex-1 gap-1">
          {/* Tên xe + loại */}
          <p className="text-lg font-semibold text-gray-900">
            {vehicleName}
            <span className="ml-2 text-sm font-medium text-yellow-600">
              {busType === BusTypeEnum.VIP
                ? "VIP"
                : busType === BusTypeEnum.LIMOUSINE
                ? "LIMOUSINE"
                : ""}
            </span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-sm font-medium text-gray-700">
              {totalSeat} chỗ
            </span>
          </p>

          {/* Biển số */}
          <p className="text-sm text-gray-500">
            Biển số:{" "}
            <span className="font-medium text-gray-700">{codeNumber}</span>
          </p>

          {/* Tuyến */}
          <p className="text-sm font-medium text-gray-700">
            {type === "go"
              ? `${fromname} → ${toName}`
              : `${toName} → ${fromname}`}
          </p>

          {/* Thời gian */}
          <p className="text-sm text-gray-500">
            {format.formatDate(departTime)}
            <span className="mx-1 text-gray-400">→</span>
            {format.formatDate(arriveTime)}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-end gap-2">
          <p className="text-lg font-bold text-yellow-600">
            {price.toLocaleString()} đ
          </p>

          <p className="text-sm text-gray-600">Còn {availableSeat} chỗ trống</p>

          <Button
            color="yellow"
            radius="md"
            size="sm"
            onClick={handleOnClickBooking}
            className="!text-black"
          >
            Đặt vé
          </Button>
        </div>
      </div>

      {/* Tabs + Detail */}
      {openModelBooking && (
        <div className="pt-6">
          {/* Tabs */}
          <div className="flex gap-6 border-b mb-4">
            <button
              className={`pb-2 font-medium transition ${
                tabSelected === "stop-point"
                  ? "border-b-2 border-yellow-500 text-yellow-600"
                  : "text-gray-600 hover:text-yellow-500"
              }`}
              onClick={() => setTabSelected("stop-point")}
            >
              Điểm đón / trả
            </button>

            <button
              className={`pb-2 font-medium transition ${
                tabSelected === "seat"
                  ? "border-b-2 border-yellow-500 text-yellow-600"
                  : "text-gray-600 hover:text-yellow-500"
              }`}
              onClick={() => setTabSelected("seat")}
            >
              Chọn ghế
            </button>
          </div>

          {/* Content */}
          {tabSelected === "stop-point" && (
            <DetailInfo
              tripId={tripId}
              stopPoints={stopPoints}
              fromId={fromId}
              toId={toId}
              fromName={fromname}
              toName={toName}
              departTime={departTime}
              arriveTime={arriveTime}
              type={type}
            />
          )}

          {tabSelected === "seat" && (
            <SeatMapModel
              tripId={tripId}
              totalSeat={totalSeat}
              price={price}
              onSubmit={() => router.push("thanh-toan")}
            />
          )}
        </div>
      )}
    </Paper>
  );
}
