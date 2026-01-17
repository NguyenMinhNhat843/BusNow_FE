"use client";

import TripItem from "./components/TripItem";
import { useState } from "react";
import FilterSideBar from "./filterSideBar";
import SearchBar from "../../component/layout/SearchBar";
import { useTrip } from "@/hooks/useTrip";
import { Pagination } from "@mantine/core";
import {
  KetQuaTimKiemProvider,
  useKetQuaTimKiemContext,
} from "./KetQuaTimKiemContext";

const SearchResultPage = () => {
  return (
    <KetQuaTimKiemProvider>
      <Inner />
    </KetQuaTimKiemProvider>
  );
};

export default SearchResultPage;

const Inner = () => {
  const { searchFilter } = useKetQuaTimKiemContext();
  const [page, setPage] = useState(1);

  const { useSearchTrip } = useTrip();
  const { data: tripData } = useSearchTrip(searchFilter ?? undefined);
  const trips = tripData?.trips || [];
  const totalPage = tripData?.pagination?.totalPage || 1;

  return (
    <div className="bg-slate-100 min-h-screen px-4 py-6">
      <div className="max-w-7xl mx-auto bg-white p-4 md:p-8 rounded-md shadow-md mb-6">
        <SearchBar />
      </div>

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
              {trips.map((trip: any) => (
                <div key={trip?.tripId} className="">
                  <TripItem trip={trip} />
                </div>
              ))}
            </div>
          )}

          <Pagination total={totalPage} value={page} onChange={setPage} />
        </div>
      </div>
    </div>
  );
};
