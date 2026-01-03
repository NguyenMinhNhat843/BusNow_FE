"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";
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
import { useLocations } from "@/hooks/useLocations";
import { Box, Group, Menu, Text } from "@mantine/core";

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

// Thêm displayName để tránh warning của ESLint
CustomDateInput.displayName = "CustomDateInput";

export default function SearchBar() {
  // common
  const router = useRouter();
  const { useGetLocations } = useLocations();
  const { data: locations } = useGetLocations();
  // search params
  const searchParams = useSearchParams();
  const fromId = searchParams.get("from");
  const toId = searchParams.get("to");
  const fromObject = locations?.find((l: any) => l.locationId === fromId);
  const toObject = locations?.find((l: any) => l.locationId === toId);
  // state
  const [isOpenMenuLocationFrom, setIsOpenMenuLocationFrom] = useState(false);
  const [isOpenMenuLocationTo, setIsOpenMenuLocationTo] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [locationSelected, setLocationSelected] = useState({
    fromId: fromId || "",
    from: fromObject?.name || "",
    toId: toId || "",
    to: toObject?.name || "",
  });

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
    setLocationSelected((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
      fromId: prev.toId,
      toId: prev.fromId,
    }));
  };

  // handle click button search
  const handleSearch = () => {
    const startDateFormatted = startDate.toISOString().split("T")[0];
    try {
      router.push(
        "/ket-qua-tim-kiem?from=" +
          locationSelected.fromId +
          "&to=" +
          locationSelected.toId +
          "&date=" +
          startDateFormatted
      );
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="relative flex justify-between gap-4 grow border border-slate-300 rounded-2xl p-2">
        {/* Nơi đi */}
        <Menu
          opened={isOpenMenuLocationFrom}
          onChange={setIsOpenMenuLocationFrom}
          position="bottom-start"
          offset={8}
          width={240}
          shadow="md"
        >
          <Menu.Target>
            <Group gap={16} style={{ cursor: "pointer", minWidth: 140 }}>
              <FontAwesomeIcon
                icon={faCircleDot}
                className="text-3xl text-blue-600"
              />

              <Box>
                <Text size="sm" c="dimmed">
                  Nơi xuất phát
                </Text>
                <Text fw={500}>{locationSelected.from}</Text>
              </Box>
            </Group>
          </Menu.Target>

          <Menu.Dropdown className="mt-2">
            {locations?.map((item: any) => (
              <Menu.Item
                key={item.locationId}
                onClick={() => handleSeletLocationFrom(item)}
              >
                {item.name}
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>

        {/* swap button */}
        <div
          className="flex justify-center items-center bg-slate-300 rounded-full w-10 h-10 cursor-pointer"
          onClick={() => handleSwapLocation()}
        >
          <FontAwesomeIcon icon={faRightLeft} />
        </div>

        {/* Nơi đến */}
        <Menu
          opened={isOpenMenuLocationTo}
          onChange={setIsOpenMenuLocationTo}
          position="bottom-start"
          offset={8}
          width={240}
          shadow="md"
        >
          <Menu.Target>
            <Group gap={16} style={{ cursor: "pointer", minWidth: 140 }}>
              <FontAwesomeIcon
                icon={faLocationDot}
                className="text-3xl text-red-600"
              />

              <Box>
                <Text size="sm" c="dimmed">
                  Nơi đến
                </Text>
                <Text fw={500}>{locationSelected.to}</Text>
              </Box>
            </Group>
          </Menu.Target>

          <Menu.Dropdown>
            {locations?.map((item: any) => (
              <Menu.Item
                key={item.locationId}
                onClick={() => handleSeletLocationTo(item)}
              >
                {item.name}
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>

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
      <div className="bg-yellow-500 cursor-pointer text-white rounded-lg hover:bg-yellow-700 transition-colors">
        <div
          className="text-xl text-center text-black px-4 py-4 w-[200px] flex items-center justify-center gap-2"
          onClick={handleSearch}
        >
          Tìm kiếm
        </div>
      </div>
      {/* end */}
    </div>
  );
}
