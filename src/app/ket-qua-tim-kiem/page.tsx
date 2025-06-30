"use client";

import { tripApi } from "@/api/tripApi";
import TripItem from "@/component/tripItem";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import FilterSideBar from "./filterSideBar";
import SearchBar from "../../component/layout/SearchBar";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const date = searchParams.get("date");

  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await tripApi.searchTrips({
          fromLocationName: from,
          toLocationName: to,
          departTime: date,
        });
        if (response.status === "success") {
          setTrips(response.trips);
        }
      } catch (error) {
        console.log("Error fetching trips:", error);
      }
    };

    if (from && to && date) {
      fetchTrips();
    } else {
      toast.error("Vui lòng nhập đầy đủ thông tin tìm kiếm.");
    }
  }, [from, to, date]);

  return (
    <div className="bg-slate-100 min-h-screen px-4 py-6">
      {/* Search Bar */}
      <div className="max-w-7xl mx-auto bg-white p-4 md:p-8 rounded-md shadow-md mb-6">
        <SearchBar />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4">
          <FilterSideBar />
        </div>

        {/* Trip Results */}
        <div className="w-full lg:w-3/4">
          <h1 className="text-xl font-bold mb-4">Kết quả tìm kiếm</h1>

          {trips.length === 0 ? (
            <p className="text-gray-500">
              Không có chuyến xe nào phù hợp với tìm kiếm của bạn.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {trips.map((trip, index) => (
                <div key={index} className="">
                  <TripItem trip={trip} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
