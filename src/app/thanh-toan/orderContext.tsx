"use client";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface OrderContextType {
  stage: number;
  setStage: Dispatch<SetStateAction<number>>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrderContext must be used within an OrderProvider");
  }
  return context;
};

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [stage, setStage] = useState(1);

  return (
    <OrderContext.Provider value={{ stage, setStage }}>
      {children}
    </OrderContext.Provider>
  );
};
