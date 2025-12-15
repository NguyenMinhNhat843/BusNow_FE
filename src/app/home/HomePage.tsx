"use client";

import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import SearchBar from "../../component/layout/SearchBar";

export default function HomePage() {
  return (
    <div className="">
      {/* Background */}
      <Image
        src="/bg_searchbar.jpg"
        alt="Backgorund searchbar"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
        <h1 className="text-white text-2xl pb-4">
          Đặt vé dễ dàng - nhanh chóng - tiện lợi
        </h1>

        <form className="bg-white rounded-2xl shadow-lg px-4 py-4 max-w-5xl w-full mx-auto">
          <SearchBar />
        </form>
      </div>
    </div>
  );
}
