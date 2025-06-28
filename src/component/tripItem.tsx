import Image from "next/image";

interface TripItemProps {
  tripId: string;
  price: number;
  departTime: string;
  arriveTime: string;
  availabelSeat: number;
  fromLocationName: string;
  toLocationName: string;
  codeNumber: string;
}

export default function TripItem({ trip }: { trip: TripItemProps }) {
  const {
    tripId,
    price,
    departTime,
    arriveTime,
    availabelSeat,
    fromLocationName,
    toLocationName,
    codeNumber,
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

  return (
    <div className="flex items-center gap-4 p-4 mb-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all">
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
          Khanh Phong - VIP 21 chỗ
        </p>
        <p className="text-sm text-gray-500">Biển số: {codeNumber}</p>
        <p className="text-sm text-gray-600">
          {fromLocationName} → {toLocationName}
        </p>
        <p className="text-sm text-gray-600">
          {departTimeFormatted} → {arriveTimeFormatted}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-end gap-2">
        <p className="text-lg font-bold text-yellow-600">
          {price.toLocaleString()} đ
        </p>
        <p className="text-sm text-gray-600">Còn {availabelSeat} chỗ trống</p>
        <button className="cursor-pointer px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black/70 font-bold text-sm rounded-md transition-all">
          Đặt vé
        </button>
      </div>
    </div>
  );
}
