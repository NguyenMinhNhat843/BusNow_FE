import { locationApi } from "@/api/locationApi";
import { set } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";
import format from "@/utils/format";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setSelectedTrip } from "@/redux/slice/tripSlice";
import { seatApi } from "@/api/seatApi";
import { toast } from "sonner";
import { BusTypeEnum } from "@/api/Enum/BusTypeEnum";

export interface TripResponse {
  tripId: string;
  price: number;
  availableSeat: number;
  totalSeat: number;
  codeNumber: string;
  vehicleName: string;
  busType: "VIP" | "STANDARD" | "LIMOUSINE"; // hoặc: BusTypeEnum nếu bạn đã định nghĩa enum
  fromId: string;
  fromname: string;
  departTime: string | Date; // kiểu tùy thuộc bạn dùng Date hay ISO string
  toId: string;
  toName: string;
  arriveTime: string | Date;
}

const tabDetaiInfoItem = [
  {
    id: "dontra",
    name: "Đón/Trả",
  },
  {
    id: "danhgia",
    name: "Đánh giá",
  },
  {
    id: "giamgia",
    name: "Giảm giá",
  },
];

export default function TripItem({ trip }: { trip: TripResponse }) {
  const {
    tripId,
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
  } = trip;
  console.log(departTime);

  const departTimeFormatted = new Date(departTime).toLocaleDateString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const arriveTimeFormatted = new Date(arriveTime).toLocaleDateString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // common
  const dispatch = useDispatch();
  const router = useRouter();

  // state
  const [openDetailInfo, setOpenDetailInfo] = useState(false);
  const [tabDetailInfoSelected, setTabDetailInfoSelected] = useState("dontra");
  const [fromLocationDetails, setFromLocationDetails] = useState<
    | {
        locationDetailId: string;
        name: string;
      }[]
    | null
  >(null);
  const [toLocationDetails, setToLocationDetails] = useState<
    | {
        locationDetailId: string;
        name: string;
      }[]
    | null
  >(null);
  // Có đang đặt vé không
  const [isBookingTicket, setIsBookingTicket] = useState(false);
  // stage booking ticket
  // 1: chọn điểm đón/trả
  // 2: chọn ghế
  // 3: thanh toán
  const [stageBookingTicket, setStageBookingTicket] = useState(1);
  const [locationSelectedBooking, setLocationSelectedBooking] = useState({
    departLocationId: "",
    departLocation: "",
    arriveLocationId: "",
    arriveLocation: "",
  });
  const [isLoadedLocationDetail, setIsLoadedLocationDetail] = useState(false);
  const [chairSelected, setChairSelected] = useState<string[]>([]);
  const [totalAmout, setTotalAmount] = useState(0);
  const [seatsIsBooked, setSeatsIsBooked] = useState<any>([]);

  // handle select fromlocation/to location to booking ticket
  const handleSelectLocationBooking = ({
    key,
    keyId,
    value,
    id,
  }: {
    key: string;
    value: string;
    keyId: string;
    id: string;
  }) => {
    setLocationSelectedBooking((prev) => {
      return {
        ...prev,
        [key]: value,
        [keyId]: id,
      };
    });
  };

  // Lấy stopppints
  const fetchStopPoints = async () => {
    try {
    } catch (error) {}
  };

  const fetchTripDetails = async () => {
    if (isLoadedLocationDetail) return;
    try {
      const response = await locationApi.getListLocationDeatil(fromname);
      setFromLocationDetails(response.locationDetails);

      const responseTo = await locationApi.getListLocationDeatil(toName);
      setToLocationDetails(responseTo.locationDetails);

      setIsLoadedLocationDetail(true);
    } catch (error) {
      console.error("Error fetching location details:", error);
    }
  };

  // Lấy danh sách ghế đã đặt trong chuyến đi này
  const fetchSeatIsBookedByTripId = async () => {
    try {
      const response = await seatApi.getSeatIsBookedByTripId(tripId);
      if (response.status === "success") {
        setSeatsIsBooked(response.data);
      }
    } catch (error) {
      toast.error("Lỗi khi lấy danh sách ghế đã đặt, vui lòng thử lại sau.");
    }
  };

  // handle click "Thông tin chi tiết"
  const handleDetailInfoClick = () => {
    // Mở cái này thì đogns cái kia
    setOpenDetailInfo(!openDetailInfo);
    setIsBookingTicket(false);

    if (tabDetailInfoSelected === "dontra") {
      fetchTripDetails();
    }
  };

  // handle change tab detail info
  const handleDetailInfoTabChange = async (tab: string) => {
    setTabDetailInfoSelected(tab);

    if (tab === "dontra") {
      fetchTripDetails();
    }
  };

  // handle click đặt vé
  const handleBookingTicket = async () => {
    // Mở cái này thì đóng cái kia
    setIsBookingTicket(!isBookingTicket);
    setOpenDetailInfo(false);

    fetchTripDetails();
  };

  // handle click next button
  const handleNextBookingStage = () => {
    // Chuyển sang trang thanh toán nếu stage = 2
    if (stageBookingTicket === 2) {
      const data = {
        tripId,
        departLocation: fromname,
        arriveLocation: toName,
        departLocationDetailId: locationSelectedBooking.departLocationId,
        departLocatioDetailName: locationSelectedBooking.departLocation,
        arriveLocationDetailId: locationSelectedBooking.arriveLocationId,
        arriveLocationDetailName: locationSelectedBooking.arriveLocation,
        departTime: departTimeFormatted,
        arriveTime: arriveTimeFormatted,
        seats: [...chairSelected],
      };
      console.log("data booking ticket", data);

      dispatch(setSelectedTrip(data));
      router.push("/thanh-toan");
      return;
    }
    setStageBookingTicket((prev) => prev + 1);
    fetchSeatIsBookedByTripId();
  };

  // handle previousStageBooking
  const handlePreviousBookingStage = () => {
    if (stageBookingTicket === 1) return;
    setStageBookingTicket((prev) => (prev > 1 ? prev - 1 : prev));
  };

  // handle select chair
  const handleSelectChair = (chair: string) => {
    const newChairSelected = chairSelected.includes(chair)
      ? chairSelected.filter((c) => c !== chair)
      : [...chairSelected, chair];
    setChairSelected(newChairSelected);

    // tính total amount
    setTotalAmount(newChairSelected.length * price);
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
            {fromname} → {toName}
          </p>
          <p className="text-sm text-gray-600">
            {departTimeFormatted} → {arriveTimeFormatted}
          </p>
          <span
            className="text-blue-400 hover:underline cursor-pointer"
            onClick={handleDetailInfoClick}
          >
            Thông tin chi tiết
          </span>
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
            onClick={handleBookingTicket}
          >
            Đặt vé
          </button>
        </div>
      </div>

      {/* model "Thông tin chi tiết" */}
      {openDetailInfo && (
        <div className="bg-white p-4">
          <div className="py-2 flex items-center justify-center gap-4">
            {tabDetaiInfoItem.map((tabItem) => {
              return (
                <p
                  key={tabItem.id}
                  className={`pe-2 cursor-pointer ${
                    tabDetailInfoSelected === tabItem.id &&
                    "text-blue-500 border-b-2 border-b-blue-400"
                  }`}
                  onClick={() => handleDetailInfoTabChange(tabItem.id)}
                >
                  {tabItem.name}
                </p>
              );
            })}
          </div>
          {tabDetailInfoSelected === "dontra" && (
            <div className="flex justify-between gap-8 max-w-xl mx-auto border p-4 rounded-lg shadow-sm bg-white">
              {/* Cột điểm đón */}
              <div className="w-1/2">
                <h3 className="font-semibold text-blue-600 pb-2 border-b">
                  Điểm đón
                </h3>
                <ul className="list-disc list-inside text-gray-700 mt-2">
                  {fromLocationDetails?.map((locationDetail: any) => (
                    <li key={locationDetail.locationDetailId}>
                      {locationDetail.name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cột điểm trả */}
              <div className="w-1/2">
                <h3 className="font-semibold text-green-600 pb-2 border-b">
                  Điểm trả
                </h3>
                <ul className="list-disc list-inside text-gray-700 mt-2">
                  {toLocationDetails?.map((locationDetail: any) => (
                    <li key={locationDetail.locationDetailId}>
                      {locationDetail.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
      {/* end: model "thông tin chi tiết" */}

      {/* model "Đặt vé" */}
      {isBookingTicket && (
        <div className="pt-4">
          <div className="max-w-xl mx-auto">
            {/* Thanh giai đoạn */}
            <div className="flex justify-center items-center gap-8 mb-4">
              <p
                className={`text-lg text-slate-500 ${
                  stageBookingTicket === 1 && "text-yellow-400 font-bold"
                }`}
              >
                Chọn điểm đón/trả
              </p>
              <p className="border border-yellow-300 h-2 w-[200px] bg-yellow-300"></p>
              <p
                className={`text-lg text-slate-700 ${
                  stageBookingTicket === 2 && "text-yellow-400 font-bold"
                }`}
              >
                Chọn ghế
              </p>
            </div>

            {/* Chọn điểm đón/trả */}
            {stageBookingTicket === 1 && (
              <div className="flex justify-between gap-8 border p-4 rounded-lg shadow-sm bg-white">
                {/* Cột điểm đón */}
                <div className="w-1/2">
                  <h3 className="font-semibold text-blue-600 pb-2 border-b">
                    Điểm đón
                  </h3>
                  <div className=" text-gray-700 mt-2">
                    {fromLocationDetails?.map((locationDetail: any) => (
                      <p
                        key={locationDetail.locationDetailId}
                        className="flex items-center gap-2 pb-4"
                      >
                        <input
                          type="radio"
                          value={locationDetail.name}
                          name="departLocation"
                          onChange={(e) =>
                            handleSelectLocationBooking({
                              key: "departLocation",
                              keyId: "departLocationId",
                              value: e.target.value,
                              id: locationDetail.locationDetailId,
                            })
                          }
                          className="w-6 h-6 cursor-pointer"
                        />
                        <label htmlFor="">{locationDetail.name}</label>
                      </p>
                    ))}
                  </div>
                </div>

                {/* Cột điểm trả */}
                <div className="w-1/2">
                  <h3 className="font-semibold text-green-600 pb-2 border-b">
                    Điểm trả
                  </h3>
                  <div className=" text-gray-700 mt-2">
                    {toLocationDetails?.map((locationDetail: any) => (
                      <p
                        key={locationDetail.locationDetailId}
                        className="flex items-center gap-2 pb-4"
                      >
                        <input
                          type="radio"
                          name="arriveLocation"
                          value={locationDetail.name}
                          onChange={(e) =>
                            handleSelectLocationBooking({
                              key: "arriveLocation",
                              keyId: "arriveLocationId",
                              id: locationDetail.locationDetailId,
                              value: e.target.value,
                            })
                          }
                          className="w-6 h-6 cursor-pointer"
                        />
                        <label htmlFor="">{locationDetail.name}</label>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {/* end: stage 1 */}

            {/* Chọn ghế */}
            {stageBookingTicket === 2 && (
              <div className="flex justify-between gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Chọn ghế
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Vui lòng chọn ghế bạn muốn đặt.
                  </p>
                  <div className="grid grid-cols-5 gap-4">
                    {Array.from({ length: totalSeat }, (_, index) => {
                      const seatCode = `A${(index + 1)
                        .toString()
                        .padStart(2, "0")}`; // "A01", "A02"...
                      const isBooked = seatsIsBooked.some(
                        (seat: any) =>
                          seat.seatCode === seatCode && seat.isBooked
                      );

                      return (
                        <button
                          key={index}
                          disabled={isBooked}
                          className={`
                            w-full h-12 rounded-md transition-colors
                            ${
                              isBooked
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-gray-200 hover:bg-yellow-300 cursor-pointer"
                            }
                            ${
                              chairSelected.includes(seatCode)
                                ? "bg-yellow-400"
                                : ""
                            }
                          `}
                          onClick={() => handleSelectChair(seatCode)}
                        >
                          {seatCode}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Cột tổng tiền */}
                <div>
                  <p className="font-bold text-lg">Tổng tiền</p>
                  <p className="text-red-400 font-bold text-2xl">
                    {format.formatMoneyVND(totalAmout)} VND
                  </p>
                </div>
              </div>
            )}
            {/* end: Chọn ghế */}

            {/* Button next stage + previous stage */}
            <div className="flex justify-between pt-8">
              <button
                className={`text-right py-2 px-4 bg-yellow-400 rounded-md ${
                  stageBookingTicket === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer hover:bg-yellow-500"
                }`}
                onClick={handlePreviousBookingStage}
              >
                Bước trước
              </button>
              <button
                className={`text-right py-2 px-4 bg-yellow-400 rounded-md cursor-pointer hover:bg-yellow-500`}
                onClick={handleNextBookingStage}
              >
                Tiếp theo
              </button>
            </div>
          </div>
        </div>
      )}
      {/* end: model "Đặt vé" */}
    </div>
  );
}
