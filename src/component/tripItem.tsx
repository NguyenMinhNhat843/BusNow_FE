import { locationApi } from "@/api/locationApi";
import { set } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";

interface TripItemProps {
  tripId: string;
  price: number;
  departTime: string;
  arriveTime: string;
  availableSeat: number;
  fromLocationName: string;
  toLocationName: string;
  codeNumber: string;
  logo: string;
  typeVehicle: string;
  subTypeVehicle?: string;
  nameProvider: string;
  totalSeat: number;
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

export default function TripItem({ trip }: { trip: TripItemProps }) {
  const {
    tripId,
    price,
    departTime,
    arriveTime,
    availableSeat,
    fromLocationName,
    toLocationName,
    codeNumber,
    nameProvider,
    typeVehicle,
    subTypeVehicle,
    totalSeat,
    logo,
  } = trip;

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

  // state
  const [openDetailInfo, setOpenDetailInfo] = useState(false);
  const [tabDetailInfoSelected, setTabDetailInfoSelected] = useState("dontra");
  const [fromLocationDetails, setFromLocationDetails] = useState<any>(null);
  const [toLocationDetails, setToLocationDetails] = useState<any>(null);

  // handle chang tab detail info
  const handleDetailInfoTabChange = (tab: string) => {
    setTabDetailInfoSelected(tab);
  };

  useEffect(() => {
    const fetchLocationDetailByLocationKeyword = async () => {
      try {
        const response = await locationApi.getListLocationDeatil(
          fromLocationName
        );
        setFromLocationDetails(response.locationDetails);

        const responseTo = await locationApi.getListLocationDeatil(
          toLocationName
        );
        setToLocationDetails(responseTo.locationDetails);
      } catch (error) {
        console.error("Error fetching location details:", error);
      }
    };

    if (tabDetailInfoSelected === "dontra") {
      fetchLocationDetailByLocationKeyword();
    }
  }, [tabDetailInfoSelected, fromLocationName, toLocationName]);

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
            {`${nameProvider} - ${
              subTypeVehicle === "VIP" ? subTypeVehicle : ""
            } ${totalSeat} chỗ`}
          </p>
          <p className="text-sm text-gray-500">Biển số: {codeNumber}</p>
          <p className="text-sm text-gray-600">
            {fromLocationName} → {toLocationName}
          </p>
          <p className="text-sm text-gray-600">
            {departTimeFormatted} → {arriveTimeFormatted}
          </p>
          <span
            className="text-blue-400 hover:underline cursor-pointer"
            onClick={() => setOpenDetailInfo(!openDetailInfo)}
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
          <button className="cursor-pointer px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black/70 font-bold text-sm rounded-md transition-all">
            Đặt vé
          </button>
        </div>
      </div>

      {/* detail info model */}
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
    </div>
  );
}
