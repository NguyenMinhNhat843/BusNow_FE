export default function TripCard({ trip }: { trip: any }) {
  return (
    <div
      key={trip.tripId}
      className="border rounded-xl p-4 shadow-sm bg-gray-50 hover:shadow-md transition"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-blue-600 font-bold text-base">
          Chuyến {trip.type === "go" ? "đi" : "về"} – {trip.vehicle.code}
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
  );
}
