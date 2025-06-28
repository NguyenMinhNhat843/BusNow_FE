import { set } from "date-fns";
import { useState } from "react";

const sortItem = [
  { label: "Mặc định", value: "default" },
  { label: "Giờ đi sớm nhất", value: "earliest" },
  { label: "Giờ đi muộn nhất", value: "latest" },
  { label: "Đánh giá cao nhất", value: "highest_rating" },
  { label: "Giá tăng dần", value: "price_asc" },
  { label: "Giá giảm dần", value: "price_desc" },
];

type FilterKey = "vehicle" | "price" | "vehicle_type";
interface FilterItem {
  label: string;
  value: FilterKey;
  type: "checkbox" | "range";
  options?: {
    label: string;
    value: string;
  }[];
}

const filterItem: FilterItem[] = [
  {
    value: "vehicle",
    label: "Nhà xe",
    options: [
      { label: "Nhà xe A", value: "xe_a" },
      { label: "Nhà xe B", value: "xe_b" },
      { label: "Nhà xe C", value: "xe_c" },
    ],
    type: "checkbox",
  },
  {
    value: "price",
    label: "Giá vé",
    type: "range",
  },
  {
    value: "vehicle_type",
    label: "Loại xe",
    options: [
      { label: "Xe giường nằm", value: "bed" },
      { label: "Xe ghế ngồi", value: "seat" },
      { label: "Xe limousine", value: "limousine" },
    ],
    type: "checkbox",
  },
];

export default function FilterSideBar() {
  // state
  const [sortSelected, setSortSelected] = useState("default");
  const [filterVehicle, setFilterVehicle] = useState<string[]>([]);
  const [filterPrice, setFilterPrice] = useState<number>(0);
  const [filterVehicleType, setFilterVehicleType] = useState<string[]>([]);

  // handle sort change
  const handleSortChange = (value: string) => {
    setSortSelected(value);
    console.log("Selected sort option:", value);
  };

  // handle resetFilter
  const handleResetFilter = () => {
    setFilterVehicle([]);
    setFilterPrice(0);
    setFilterVehicleType([]);
  };

  // handle change filterVehicle
  const handleVehicleChange = (value: string) => {
    setFilterVehicle((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  // handle change filter price
  const handlePriceChange = (e: any) => {
    const value = parseInt(e.target.value, 10);
    setFilterPrice(value);
  };

  // handle change filterVehicleType
  const handleVehicleTypeChange = (value: string) => {
    setFilterVehicleType((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  return (
    <div>
      {/* sort */}
      <div className="bg-white rounded-lg shadown-lg me-4 p-2">
        <div className="font-bold">Sắp xếp</div>
        <ul>
          {sortItem.map((item) => {
            return (
              <li key={item.value} className="px-4 py-2 transition-colors">
                <label
                  htmlFor={item.value}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    id={item.value}
                    type="radio"
                    name="sortInput"
                    className="w-6 h-6 cursor-pointer"
                    value={item.value}
                    onChange={() => handleSortChange(item.value)}
                    checked={sortSelected === item.value}
                  />
                  <span>{item.label}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      {/* filter */}
      <div className="bg-white rounded-lg shadown-lg me-4 p-2 mt-4">
        {/* filter header */}
        <div className="flex justify-between items-center">
          <p className="font-bold">Lọc chuyến đi</p>
          <span
            className="text-slate-700 cursor-pointer"
            onClick={() => handleResetFilter()}
          >
            Xóa lọc
          </span>
        </div>
        {/* filter body */}
        <div>
          {filterItem.map((filterKey) => {
            return (
              <div key={filterKey.value} className="pt-2">
                <p className="font-bold">{filterKey.label}</p>
                {filterKey.value === "vehicle" && (
                  <div className="pt-1">
                    {filterKey.options?.map((option) => {
                      return (
                        <div key={option.value}>
                          <label
                            htmlFor={option.value}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              id={option.value}
                              type="checkbox"
                              className="w-4 h-4"
                              value={filterVehicle}
                              checked={filterVehicle.includes(option.value)}
                              onChange={() => handleVehicleChange(option.value)}
                            />
                            <span>{option.label}</span>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                )}

                {filterKey.value === "price" && (
                  <div>
                    <label htmlFor={filterKey.value} className="block pb-1">
                      Giá tối đa: {filterPrice.toLocaleString("vi-VN")} VND
                    </label>
                    <input
                      id={filterKey.value}
                      type="range"
                      min={0}
                      max={2000000}
                      step={50000}
                      value={filterPrice}
                      onChange={() => handlePriceChange(event)}
                      className="w-full cursor-pointer"
                    />
                  </div>
                )}

                {filterKey.value === "vehicle_type" && (
                  <div className="pt-1">
                    {filterKey.options?.map((option) => {
                      return (
                        <div key={option.value}>
                          <label
                            htmlFor={option.value}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              id={option.value}
                              type="checkbox"
                              className="w-4 h-4 cursor-pointer"
                              value={filterVehicleType}
                              checked={filterVehicleType.includes(option.value)}
                              onChange={() =>
                                handleVehicleTypeChange(option.value)
                              }
                            />
                            <span>{option.label}</span>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
