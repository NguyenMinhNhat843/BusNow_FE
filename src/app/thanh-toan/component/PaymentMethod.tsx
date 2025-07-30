import { useState } from "react";
import { useOrderContext } from "../orderContext";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { tripApi } from "@/api/tripApi";
import { ticketApi } from "@/api/ticketApi";
import { useRouter } from "next/navigation";

const methodItems = [
  {
    value: "CASH",
    name: "Thanh toán tại quầy bán",
  },
  {
    value: "BANKING",
    name: "Thanh toán qua ngân hàng",
  },
];

export default function PaymentMethod() {
  // common
  const router = useRouter();

  // locastorage
  const storedUser = localStorage.getItem("guest");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // context
  const { stage, setStage } = useOrderContext();

  // state
  const [selectedMethod, setSelectedMethod] = useState<string>("CASH");
  const [loading, setLoading] = useState(false);

  // redux
  const dataTrip = useSelector(
    (state: RootState) => state.trip.tripItemSelected
  );
  const bookingInfo = useSelector((state: RootState) => state.booking);

  // handle previos stage
  const handlePreviousStage = () => {
    setStage(1);
  };

  // handle select method payment
  const handleSelectPaymentMethod = (value: string) => {
    setSelectedMethod(value);
  };

  // handle call api create ticket
  const handleCreateTicket = async () => {
    if (!selectedMethod) {
      toast.error("Vui lòng chọn phương thức thanh toán!!!");
      return;
    }
    if (user === null) {
      toast.error(
        "Bạn hãy nhập đủ thông tin firstname, lastName, phone, email"
      );
      return;
    }
    try {
      setLoading(true);
      const dataApi = {
        tripId: bookingInfo.tripId,
        seatCode: bookingInfo.selectedSeats,
        methodPayment: selectedMethod,
        phone: user.phoneNumber,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
      const response = await ticketApi.createTicket(dataApi);
      if (response.message) {
        toast.success("Tạo vé thành công!");
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
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
              checked={selectedMethod === item.value}
              onChange={() => handleSelectPaymentMethod(item.value)}
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
          {loading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          )}
          {loading ? "Đang xử lý..." : "Thanh Toán"}
        </button>
      </div>
    </div>
  );
}
