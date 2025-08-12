"use client";

import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import RoutePopulateItem from "@/component/RoutePopulateItem";
import Image from "next/image";
import SearchBar from "../../component/layout/SearchBar";
import { userApi } from "@/api/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slice/authSlice";

interface Location {
  locationId: string;
  name: string;
}

export default function HomePage() {
  // common
  const dispatch = useDispatch();

  return (
    <main className="select-none w-screen h-screen">
      {/* SearchBar */}
      <div className="relative w-full h-full">
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
            <SearchBar />
          </form>
        </div>
      </div>
      {/* end: search bar */}
    </main>
  );
}
