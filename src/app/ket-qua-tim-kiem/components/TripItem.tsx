import { BusTypeEnum } from "@/api/Enum/BusTypeEnum";
import Image from "next/image";
import format from "@/utils/format";
import { useEffect, useState } from "react";
import { stopPointApi } from "@/api/stopPointApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setFrom, setSeats } from "@/redux/slice/bookingSlice";
import DetailInfo from "./StopPoint";
import SeatMapModel from "./SeatMapUI";

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
  } = trip;
  const router = useRouter();

  // state
  const [openModelDetailInfo, setOpenModelDetailInfo] =
    useState<boolean>(false);
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
    <div className="bg-white border border-gray-200 p-4 mb-4 rounded-lg shadow-sm hover:shadow-2xl transition-all">
      {/* base info */}
      <div className="flex items-center gap-4">
        {/* Vehicle Image */}
        <div className="relative w-28 h-20 flex-shrink-0 rounded overflow-hidden">
          <Image
            src="/logo.webp"
            alt="avatar vehicle"
            fill
            className="object-cover"
          />
        </div>

        {/* Trip Info */}
        <div className="flex flex-col justify-between grow">
          <p className="text-lg font-semibold text-gray-800">
            {`${vehicleName} - ${
              busType === BusTypeEnum.VIP
                ? "VIP"
                : busType === BusTypeEnum.LIMOUSINE
                ? "LIMOUSINE"
                : ""
            } ${totalSeat} chỗ`}
          </p>
          <p className="text-sm text-gray-500">Biển số: {codeNumber}</p>
          <p className="text-sm text-gray-600">
            {type === "go"
              ? `${fromname} -> ${toName}`
              : `${toName} -> ${fromname}`}
          </p>
          <p className="text-sm text-gray-600">
            {format.formatDate(departTime)} → {format.formatDate(arriveTime)}
          </p>
          {/* <span
            className="text-blue-400 hover:underline cursor-pointer"
            onClick={() => setOpenModelDetailInfo(!openModelDetailInfo)}
          >
            Thông tin chi tiết
          </span> */}
        </div>

        {/* Actions */}
        <div className="flex flex-col items-end gap-2">
          <p className="text-lg font-bold text-yellow-600">
            {price.toLocaleString()} đ
          </p>
          <p className="text-sm text-gray-600">Còn {availableSeat} chỗ trống</p>
          <button
            className="cursor-pointer px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black/70
                 font-bold text-sm rounded-md transition-all"
            onClick={handleOnClickBooking}
          >
            Đặt vé
          </button>
        </div>
      </div>

      <div className="pt-6">
        {openModelBooking && (
          <div className="flex justify-start gap-4 border-b mb-4">
            <button
              className={`px-4 py-2 font-medium transition ${
                tabSelected === "stop-point"
                  ? "border-b-2 border-yellow-500 text-yellow-600"
                  : "text-gray-600 hover:text-yellow-500"
              }`}
              onClick={() => setTabSelected("stop-point")}
            >
              Điểm đón / trả
            </button>
            <button
              className={`px-4 py-2 font-medium transition ${
                tabSelected === "seat"
                  ? "border-b-2 border-yellow-500 text-yellow-600"
                  : "text-gray-600 hover:text-yellow-500"
              }`}
              onClick={() => setTabSelected("seat")}
            >
              Chọn ghế
            </button>
          </div>
        )}
        {openModelBooking && tabSelected === "stop-point" && (
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
        {openModelBooking && tabSelected === "seat" && (
          <SeatMapModel
            tripId={tripId}
            totalSeat={totalSeat}
            price={price}
            onSubmit={() => router.push("thanh-toan")}
          />
        )}
      </div>
    </div>
  );
}
