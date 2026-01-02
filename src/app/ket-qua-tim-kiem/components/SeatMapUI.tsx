import { useTicket } from "@/hooks/useTicket";
import {
  setSeats,
  setTotalAmout,
  setTripInfo,
} from "@/redux/slice/bookingSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

const SeatMapModel = ({
  totalSeat,
  price,
  onSubmit,
  tripId,
}: {
  totalSeat: number;
  price: number;
  onSubmit: () => void;
  tripId: string;
}) => {
  const dispatch = useDispatch();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const totalAmount = selectedSeats.length * price;
  const { useGetTicketByTrip } = useTicket();
  const { data: ticketsByTripResponse, isLoading: isLoadingSeatBooked } =
    useGetTicketByTrip(tripId);

  const toggleSelectedSeat = (seatNumber: number) => {
    const newSeats = selectedSeats.includes(seatNumber)
      ? selectedSeats.filter((seat) => seat !== seatNumber)
      : [...selectedSeats, seatNumber];
    setSelectedSeats(newSeats);

    dispatch(setSeats(newSeats));
    dispatch(setTotalAmout(price * newSeats.length));
  };

  const onClickPayment = () => {
    dispatch(setTripInfo(tripId));
    onSubmit();
  };

  if (isLoadingSeatBooked) return;
  const seatBooked = ticketsByTripResponse?.data;

  return (
    <div className="flex flex-col md:flex-row justify-between gap-6 bg-white rounded-xl p-6 border shadow-sm">
      {/* Ghế bên trái */}
      <div className="flex-1">
        <p className="text-lg font-semibold text-gray-700 mb-3">
          Chọn ghế ({totalSeat} ghế)
        </p>

        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: totalSeat }).map((_, index) => {
            const seatNumber = index + 1;
            const isSelected = selectedSeats.includes(seatNumber);
            const isBooked = seatBooked
              .map((seat: any) => seat.seatCode)
              .includes(seatNumber);

            return (
              <button
                key={seatNumber}
                onClick={() => !isBooked && toggleSelectedSeat(seatNumber)}
                disabled={isBooked}
                className={`w-12 h-12 rounded-md border text-sm font-semibold transition
                  ${
                    isBooked
                      ? "bg-gray-400 text-white border-gray-500 cursor-not-allowed"
                      : isSelected
                      ? "bg-blue-500 text-white border-blue-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                {seatNumber}
              </button>
            );
          })}
        </div>
      </div>

      {/* Thông tin bên phải */}
      <div className="w-full md:w-60">
        <h3 className="text-base font-semibold text-gray-800 mb-3">
          Tóm tắt đặt chỗ
        </h3>

        <div className="text-sm space-y-2 text-gray-700">
          <div>
            Ghế đã chọn:{" "}
            <span className="font-semibold text-blue-600">
              {selectedSeats.length > 0
                ? selectedSeats.join(", ")
                : "Chưa chọn"}
            </span>
          </div>

          <div>
            Số lượng:{" "}
            <span className="font-semibold">{selectedSeats.length} ghế</span>
          </div>

          <div>
            Giá 1 vé:{" "}
            <span className="font-semibold">{price.toLocaleString()} đ</span>
          </div>

          <div className="pt-2 border-t">
            Tổng tiền:{" "}
            <span className="text-lg font-bold text-red-600">
              {totalAmount.toLocaleString()} đ
            </span>
          </div>
        </div>

        <div className="pt-4">
          <button
            className="cursor-pointer px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black/70
                 font-bold text-sm rounded-md transition-all"
            onClick={onClickPayment}
          >
            Tới trang thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatMapModel;
