"use client";

import { tripApi } from "@/api/tripApi";
import TripItem from "@/component/tripItem";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import FilterSideBar from "./filterSideBar";

export default function SearchResultsPage() {
  // Get params from URL
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const date = searchParams.get("date");

  // state
  const [trips, setTrips] = useState([]);

  // Call API get searchTrip
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
    <div className="bg-slate-100 flex justify-center h-[1000px]">
      <div className="w-[1200px] flex p-8 ">
        <div className="">
          <FilterSideBar />
        </div>
        <div className="grow">
          <h1>Kết quả tìm kiếm</h1>
          {trips.length === 0 && (
            <p className="text-gray-500">
              Không có chuyến xe nào phù hợp với tìm kiếm của bạn.
            </p>
          )}
          {trips.length > 0 &&
            trips.map((trip, index) => {
              return (
                <div key={index} className="bg-white">
                  <TripItem trip={trip} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
