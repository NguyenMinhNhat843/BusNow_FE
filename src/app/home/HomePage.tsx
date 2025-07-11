"use client";

import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import RoutePopulateItem from "@/component/RoutePopulateItem";
import Image from "next/image";
import SearchBar from "../../component/layout/SearchBar";
import { toast } from "sonner";
import { locationApi } from "@/api/locationApi";

const vehicle = [
  {
    id: 1,
    name: "Xe khách",
    // icon:
  },
  {
    id: 2,
    name: "Máy bay",
    // icon:
  },
  {
    id: 3,
    name: "Tàu hỏa",
    // icon:
  },
  {
    id: 4,
    name: "Thuê xe",
    // icon:
  },
];

interface Location {
  locationId: string;
  name: string;
}

export default function HomePage() {
  // state
  const [vehicleTab, setVehicleTab] = useState("Xe khách");

  return (
    <main className="select-none">
      {/* SearchBar */}
      <div className="relative h-[400px]">
        <div className="absolute w-full h-full">
          <Image
            src="/bg_searchbar.jpg"
            alt="Backgorund searchbar"
            fill
            style={{ objectFit: "cover" }}
            priority // nếu bạn muốn load ảnh ngay lập tức (ví dụ background trang chính)
          />
        </div>

        {/* Overlay */}
        <div className="absolute w-full h-full flex flex-col items-center justify-center bg-black/50">
          <h1 className="text-white text-2xl pb-4">
            Đặt vé dễ dàng - nhanh chóng - tiện lợi
          </h1>
          <form
            action=""
            className="bg-white rounded-2xl shadow-lg px-4 py-4 max-w-5xl w-full mx-auto"
          >
            {/* Tab vehicle */}
            <div className="flex justify-center items-center gap-6 pb-4">
              {vehicle.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`cursor-pointer ${
                      item.name === vehicleTab
                        ? "font-bold border-b-2 border-blue-500"
                        : ""
                    }`}
                    onClick={() => setVehicleTab(item.name)}
                  >
                    <p>{item.name}</p>
                  </div>
                );
              })}
            </div>
            {/* end: Tab vehicle */}

            {/* SearchBar content */}
            <SearchBar />
            {/* end: SearchBar content */}
          </form>
        </div>
      </div>
      {/* end: search bar */}
      {/* Tuyến đường phổ biến */}
      <div className="max-w-5xl mx-auto py-8">
        <p className="text-2xl pb-2">Tuyến đường phổ biến</p>
        <div className="flex justify-between items-center gap-4">
          {[1, 2, 3, 4].map((item, index) => (
            <RoutePopulateItem key={index} />
          ))}
        </div>
      </div>
      {/* end: Tuyến đường phổ biến */}
    </main>
  );
}
