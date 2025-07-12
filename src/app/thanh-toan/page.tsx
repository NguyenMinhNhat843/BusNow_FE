"use client";

import { useSelector } from "react-redux";
import FormOrderInfo from "./component/formOrderInfo";
import PaymentMethod from "./component/PaymentMethod";
import { OrderProvider, useOrderContext } from "./orderContext";
import { RootState } from "@/redux/store";
import { useEffect } from "react";

function PaymentPageContent() {
  const { stage, setStage } = useOrderContext();
  const info = useSelector((state: RootState) => state.booking);
  useEffect(() => {
    console.log(info);
  }, []);

  return (
    <div className="flex flex-col items-center pt-8">
      <div className="w-[800px] p-4 shadow-2xl rounded-md">
        <div className="flex justify-between items-center gap-4">
          <p
            className={`font-semibold text-lg ${
              stage === 1 && "text-yellow-400"
            }`}
          >
            Xác nhận thông tin
          </p>
          <div className="h-2 w-[300px] pt-1">
            <p className="border-t-2 border-dashed border-gray-300"></p>
          </div>
          <p
            className={`font-semibold text-lg ${
              stage === 2 && "text-yellow-500"
            }`}
          >
            Thanh toán hóa đơn
          </p>
        </div>

        <div>
          {stage === 1 && <FormOrderInfo />}
          {stage === 2 && <PaymentMethod />}
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <OrderProvider>
      <PaymentPageContent />
    </OrderProvider>
  );
}
