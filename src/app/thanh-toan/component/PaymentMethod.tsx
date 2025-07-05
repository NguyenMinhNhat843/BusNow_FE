import { useState } from "react";
import { useOrderContext } from "../orderContext";

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

  // handle previos stage
  const handlePreviousStage = () => {
    setStage(1);
  };

  // handle select method payment
  const handleSelectPaymentMethod = (value: string) => {
    setSelectedMethod(value);
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
        <button className="bg-yellow-400 py-2 px-4 rounded-md cursor-pointer hover:bg-yellow-500">
          Tiếp tục
        </button>
      </div>
    </div>
  );
}
