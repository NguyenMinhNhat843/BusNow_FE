"use client";

import { tripApi } from "@/api/tripApi";
import TripItem from "./components/TripItem";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import FilterSideBar from "./filterSideBar";
import SearchBar from "../../component/layout/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  descreaseCurrentPage,
  increaseCurrentPage,
  resetCurrentPageToFirst,
  setSearchParams,
} from "@/redux/slice/tripSlice";
import { set } from "date-fns";

const itemPerPage = 5;

export default function SearchResultsPage() {
  // common
  const dispatch = useDispatch();
  const router = useRouter();

  // state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [params, setParams] = useState<any>({});
  const [trips, setTrips] = useState<any[]>([]);
  const [totalPage, setTotalPage] = useState(0);

  // lấy search params từ url
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const date = searchParams.get("date");

  // call api fetch trips
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const body = {
          fromLocationId: from,
          toLocationId: to,
          departTime: date,
          page: currentPage,
          limit: itemPerPage,
        };
        const res = await tripApi.searchTrips(body);
        setTrips(res.trips);
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    };

    fetchTrips();
  }, [from, to, date]);

  // render search result page
  const handleNextPage = async () => {
    // Kiểm tra phải trang cuối không
    if (currentPage >= totalPage) {
      toast.error("Đã đến trang cuối cùng.");
      return;
    }
    dispatch(increaseCurrentPage());
  };

  const hanldePreviousPage = async () => {
    // Kiêm tra phải trang đầu không
    if (currentPage <= 1) {
      toast.error("Đã đến trang đầu tiên.");
      return;
    }
    dispatch(descreaseCurrentPage());
  };

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
          <FilterSideBar setTrips={setTrips} />
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

          {/* paginaton */}
          <div className="flex justify-center">
            <div className="flex justify-center items-center gap-2 mt-4">
              <div
                className="w-10 h-10 rounded-full bg-yellow-400 flex justify-center items-center cursor-pointer"
                onClick={() => hanldePreviousPage()}
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </div>
              {/* <span className="mx-2">{currentPage}</span> */}
              <span className="mx-2">{currentPage}</span>
              <span>/</span>
              <span className="mx-2">{totalPage}</span>
              <div
                className="w-10 h-10 rounded-full bg-yellow-400 flex justify-center items-center cursor-pointer"
                onClick={() => handleNextPage()}
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* end: content */}
    </div>
  );
}
