import { TripControllerSearchTripParams } from "@/apiOrval/bussNowAPI";
import { useSearchParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import page from "./page";

interface KetQuaTimKiemContextType {
  searchFilter: TripControllerSearchTripParams | null;
  setSearchFilter: React.Dispatch<
    React.SetStateAction<TripControllerSearchTripParams | null>
  >;
}

const KetQuaTimKiemContext = createContext<KetQuaTimKiemContextType | null>(
  null,
);

export const KetQuaTimKiemProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const date = searchParams.get("date");
  const limit = 10;
  const [searchFilter, setSearchFilter] =
    useState<TripControllerSearchTripParams | null>({
      fromLocationId: from || "",
      toLocationId: to || "",
      departTime: date || "",
      page: 1,
      limit: limit,
    });

  useEffect(() => {
    if (from && to && date) {
      setSearchFilter((prev) => ({
        ...prev,
        fromLocationId: from,
        toLocationId: to,
        departTime: date,
        page: 1,
        limit: limit,
      }));
    }
  }, [from, to, date]);

  const data = { searchFilter, setSearchFilter };

  return (
    <KetQuaTimKiemContext.Provider value={data}>
      {children}
    </KetQuaTimKiemContext.Provider>
  );
};

export const useKetQuaTimKiemContext = () => {
  const context = useContext(KetQuaTimKiemContext);
  if (!context) {
    throw new Error(
      "useKetQuaTimKiemContext must be used within a KetQuaTimKiemProvider",
    );
  }
  return context;
};
