"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCircleDot,
  faLocationDot,
  faRightLeft,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { vi } from "date-fns/locale";
import { useRouter, useSearchParams } from "next/navigation";
import { locationApi } from "@/api/locationApi";
import { toast } from "sonner";

// Component tuỳ biến hiển thị ngày
const CustomDateInput = forwardRef<
  HTMLButtonElement,
  { value?: string; onClick?: () => void }
>(({ value, onClick }, ref) => (
  <button
    type="button"
    className="text-left text-base"
    onClick={onClick}
    ref={ref}
  >
    {value || "Chọn ngày"}
  </button>
));

// ✅ Thêm displayName để tránh warning của ESLint
CustomDateInput.displayName = "CustomDateInput";

export default function HomePage() {
  // common
  const router = useRouter();

  // state
  const [isOpenMenuLocationFrom, setIsOpenMenuLocationFrom] = useState(false);
  const [isOpenMenuLocationTo, setIsOpenMenuLocationTo] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [locations, setLocations] = useState<ResponseGetAllLocations[]>([]);
  const menuLocationFromRef = useRef<HTMLDivElement>(null);
  const menuLocationToRef = useRef<HTMLDivElement>(null);
  const [locationSelected, setLocationSelected] = useState({
    fromId: "",
    from: "",
    toId: "",
    to: "",
  });

  // search params
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  // fetch locations
  const fetchLocations = async () => {
    try {
      const response: ResponseGetAllLocations[] =
        await locationApi.getAllLocation();
      setLocations(response);
      setLocationSelected({
        fromId: response[0].locationId,
        from: response[0].name,
        toId: response[1].locationId,
        to: response[1].name,
      });
      localStorage.setItem("locations", JSON.stringify(response));
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    const locationsStorage = localStorage.getItem("locations");

    const initFromURL = (locationsJsonArray: any[]) => {
      // Nếu có param from/to thì tìm name tương ứng
      if (from && to) {
        const fromLocation = locationsJsonArray.find(
          (loc: any) => loc.locationId === from
        );
        const toLocation = locationsJsonArray.find(
          (loc: any) => loc.locationId === to
        );

        if (fromLocation && toLocation) {
          setLocationSelected({
            fromId: fromLocation.locationId,
            from: fromLocation.name,
            toId: toLocation.locationId,
            to: toLocation.name,
          });
          return;
        }
      }

      // Không có param thì set mặc định
      setLocationSelected({
        fromId: locationsJsonArray[0].locationId,
        from: locationsJsonArray[0].name,
        toId: locationsJsonArray[1].locationId,
        to: locationsJsonArray[1].name,
      });
    };

    if (locationsStorage === null) {
      // Nếu localStorage rỗng, fetch API
      fetchLocations().then(() => {
        const newLocations = JSON.parse(
          localStorage.getItem("locations") || "[]"
        );
        if (newLocations.length) {
          setLocations(newLocations);
          initFromURL(newLocations);
        }
      });
    } else {
      const locationsJsonArray = JSON.parse(locationsStorage);
      setLocations(locationsJsonArray);
      initFromURL(locationsJsonArray);
    }
  }, []);

  // handle select location
  const handleSeletLocationFrom = (location: any) => {
    setLocationSelected((prev) => ({
      ...prev,
      from: location.name,
      fromId: location.locationId,
    }));
    setIsOpenMenuLocationFrom(false); // close menu after selecting
  };

  // handle select location
  const handleSeletLocationTo = (location: any) => {
    setLocationSelected((prev) => ({
      ...prev,
      to: location.name,
      toId: location.locationId,
    }));
    setIsOpenMenuLocationTo(false); // close menu after selecting
  };

  // handle swap location
  const handleSwapLocation = () => {
    setLocationSelected((prev) => ({ ...prev, from: prev.to, to: prev.from }));
  };

  // handle cick outside to close menu location - location from
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuLocationFromRef.current &&
        !menuLocationFromRef.current.contains(event.target as Node)
      ) {
        setIsOpenMenuLocationFrom(false);
      }
    };

    // add listener
    document.addEventListener("mousedown", handleClickOutside);

    // cleanup listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // handle cick outside to close menu location - location to
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuLocationToRef.current &&
        !menuLocationToRef.current.contains(event.target as Node)
      ) {
        setIsOpenMenuLocationTo(false);
      }
    };

    // add listener
    document.addEventListener("mousedown", handleClickOutside);

    // cleanup listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // handle click button search
  const handleSearch = async () => {
    const startDateFormatted = startDate.toISOString().split("T")[0]; // format date to YYYY-MM-DD

    router.push(
      "/ket-qua-tim-kiem?from=" +
        locationSelected.fromId +
        "&to=" +
        locationSelected.toId +
        "&date=" +
        startDateFormatted
    );
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="relative flex justify-between gap-4 grow border border-slate-300 rounded-2xl p-2">
        {/* Nơi đi */}
        <div
          className="relative flex items-center gap-4 min-w-[140px]"
          ref={menuLocationFromRef}
        >
          <FontAwesomeIcon
            icon={faCircleDot}
            className="text-3xl text-blue-600"
          />
          <div
            className="cursor-pointer select-none"
            onClick={() => setIsOpenMenuLocationFrom(!isOpenMenuLocationFrom)}
          >
            <p className="text-sm text-slate-500">Nơi xuất phát</p>
            <p>{locationSelected.from}</p>
          </div>

          {/* menu location */}
          {isOpenMenuLocationFrom && (
            <div className="absolute top-20 -left-1 w-[240px] bg-white shadow-lg rounded-lg py-4">
              <ul>
                {locations.map((item) => (
                  <li
                    key={item.locationId}
                    className="py-2 px-4 cursor-pointer hover:bg-slate-100 "
                    onClick={() => handleSeletLocationFrom(item)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* swap button */}
        <div
          className="flex justify-center items-center bg-slate-300 rounded-full w-10 h-10 cursor-pointer"
          onClick={() => handleSwapLocation()}
        >
          <FontAwesomeIcon icon={faRightLeft} />
        </div>

        {/* Nơi đến */}
        <div
          className="relative flex items-center gap-4 min-w-[140px]"
          onClick={() => setIsOpenMenuLocationTo(!isOpenMenuLocationTo)}
          ref={menuLocationToRef}
        >
          <FontAwesomeIcon
            icon={faLocationDot}
            className="text-3xl text-red-600"
          />
          <div className="cursor-pointer select-none">
            <p className="text-sm text-slate-500">Nơi đến</p>
            <p>{locationSelected.to}</p>
          </div>

          {/* menu location */}
          {isOpenMenuLocationTo && (
            <div className="absolute top-20 w-[240px] bg-white shadow-lg rounded-lg py-4">
              <ul>
                {locations.map((item) => (
                  <li
                    key={item.locationId}
                    className="py-2 px-4 cursor-pointer hover:bg-slate-100 "
                    onClick={() => handleSeletLocationTo(item)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* separation */}
        <div className="border-l border-slate-300 h-10"></div>

        {/* Ngày đi */}
        <div className="flex items-center gap-4 min-w-[200px] select-none">
          <FontAwesomeIcon
            icon={faCalendar}
            className="text-3xl text-blue-600"
          />
          <div className="cursor-pointer">
            <p className="text-sm text-slate-500">Ngày đi</p>
            <div className="">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date as Date)}
                locale={vi}
                dateFormat={"eeee, dd/MM/yyyy"}
                className="border px-3 py-1 rounded-md"
                customInput={<CustomDateInput />}
                minDate={new Date()}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Nút Tìm kiếm */}
      <div className="bg-yellow-500 cursor-pointer text-white  rounded-lg hover:bg-yellow-700 transition-colors">
        <p
          className="text-xl text-center text-black px-4 py-4 w-[200px] "
          onClick={handleSearch} // Thêm sự kiện click để tìm kiếm
        >
          Tìm kiếm
        </p>
      </div>
      {/* end */}
    </div>
  );
}
