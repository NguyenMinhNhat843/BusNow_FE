import { useState } from "react";
import { useOrderContext } from "../orderContext";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { tripApi } from "@/api/tripApi";
import { ticketApi } from "@/api/ticketApi";

const methodItems = [
  {
    value: "cash",
    name: "Thanh toán tại quầy bán",
  },
  {
    value: "banking",
    name: "Thanh toán qua ngân hàng",
  },
];

export default function PaymentMethod() {
  // context
  const { stage, setStage } = useOrderContext();

  // state
  const [selectedMethod, setSelectedMethod] = useState<string>("");

  // redux
  const dataTrip = useSelector(
    (state: RootState) => state.trip.tripItemSelected
  );

  // handle previos stage
  const handlePreviousStage = () => {
    setStage(1);
  };

  // handle select method payment
  const handleSelectPaymentMethod = (value: string) => {
    setSelectedMethod(value);
  };

  // handle call api create ticket
  const handleCreateTicket = () => {
    try {
      const dataApi = {
        tripId: dataTrip.tripId,
        seatCode: "A01",
        departLocationDetailId: dataTrip.departLocationDetailId,
        arriveLocationDetailId: dataTrip.arriveLocationDetailId,
        methodPayment: "CASH",
      };
      const response = ticketApi.createTicket(dataApi);
      toast.success("Tạo vé thành công!");
    } catch (error) {
      toast.error("Lỗi khi tạo vé, vui lòng thử lại sau.");
    }
  };

  return (
    <div>
      {/* form method payment */}
      <div>
        {methodItems.map((item) => (
          <div
            key={item.value}
            className="flex items-center gap-2 pt-4 cursor-pointer"
            onClick={() => handleSelectPaymentMethod(item.value)}
          >
            <input
              id={item.value}
              type="radio"
              name="method_payment"
              className="w-6 h-6 cursor-pointer"
            />
            <label htmlFor={item.value} className="cursor-pointer">
              {item.name}
            </label>
          </div>
        ))}
      </div>

      {/* button previous */}
      <div className="pt-4 flex justify-between items-center">
        <button
          className="bg-yellow-400 py-2 px-4 rounded-md cursor-pointer hover:bg-yellow-500"
          onClick={handlePreviousStage}
        >
          Quay lại
        </button>
        <button
          className="bg-yellow-400 py-2 px-4 rounded-md cursor-pointer hover:bg-yellow-500"
          onClick={() => handleCreateTicket()}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
}
