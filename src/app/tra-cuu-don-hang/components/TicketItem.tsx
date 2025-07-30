import { BusTypeEnum } from "@/api/Enum/BusTypeEnum";
import { ButtonCancelled } from "./ButtonCancelled";

export default function TicketItem({
  ticket,
  openModalCancelled,
  setOpenModalCancelled,
}: any) {
  const onClickuttonCancelled = () => {
    setOpenModalCancelled(true);
  };

  return (
    <div className="p-6 border border-gray-200 rounded-2xl shadow-md bg-white">
      <div className="">
        <div>
          <div className="text-xl font-semibold text-blue-700">
            {ticket.providerName}{" "}
            {ticket.vehicleType !== BusTypeEnum.STANDARD && (
              <span className="text-sm font-medium text-gray-500 ml-2">
                ({ticket.vehicleType})
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mt-4">
            <p>
              <span className="font-medium">Biển số xe:</span>{" "}
              {ticket.vehicleCode}
            </p>
            <p>
              <span className="font-medium">Ghế:</span>{" "}
              <span className="text-green-600 font-semibold">
                {ticket.seatCode}
              </span>
            </p>
            <p>
              <span className="font-medium">Giá vé:</span>{" "}
              <span className="text-red-600 font-semibold">
                {/* {ticket.price.toLocaleString()}₫ */}
              </span>
            </p>
            <p>
              <span className="font-medium">Tuyến:</span> {ticket.origin} →{" "}
              {ticket.destination}
            </p>
            <p>
              <span className="font-medium">Giờ khởi hành:</span>{" "}
              {new Date(ticket.departDate).toLocaleString()}
            </p>
            <p>
              <span className="font-medium">Thanh toán:</span>{" "}
              <span className="uppercase">
                {ticket.paymentMethod === "CASH" ? "Tại quầy" : "Chuyển khoản"}
              </span>
            </p>
            <p>
              <span className="font-medium">TT Thanh toán:</span>{" "}
              <span
                className={`font-semibold ${
                  ticket.paymentStatus === "PAID"
                    ? "text-green-600"
                    : ticket.paymentStatus === "PENDING"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {ticket.paymentStatus === "PAID"
                  ? "Đã thanh toán"
                  : "Chưa thanh toán"}
              </span>
            </p>
            <p>
              <span className="font-medium">TT Chuyến:</span>{" "}
              <span
                className={`font-semibold ${
                  ticket.tripStatus === "READY"
                    ? "text-green-700"
                    : ticket.tripStatus === "CANCELLED"
                    ? "text-red-600"
                    : "text-gray-700"
                }`}
              >
                {ticket.tripStatus === "CANCLLEDD"
                  ? "Bị hủy"
                  : ticket.tripStatus === "SUCCESS"
                  ? "Thành công"
                  : "Đang đợi"}
              </span>
            </p>
          </div>

          <div className="pt-4">
            <button
              onClick={() => onClickuttonCancelled()}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Hủy vé
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
