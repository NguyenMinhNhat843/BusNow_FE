import { tripApi } from "@/api/tripApi";
import { setFilter } from "@/redux/slice/filterTripSlice";
import {
  resetCurrentPageToFirst,
  resetFilterTrips,
  setSearchParams,
} from "@/redux/slice/tripSlice";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const sortItem = [
  { label: "Mặc định", value: "default" },
  { label: "Giờ đi sớm nhất", value: "departTime_asc" },
  { label: "Giờ đi muộn nhất", value: "departTime_desc" },
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
    value: "price",
    label: "Giá vé",
    type: "range",
  },
  {
    value: "vehicle_type",
    label: "Loại xe",
    options: [
      { label: "Xe thường", value: "STANDARD" },
      { label: "Xe VIP", value: "VIP" },
      { label: "Xe limousine", value: "LIMOUSINE" },
    ],
    type: "checkbox",
  },
];

export default function FilterSideBar() {
  // common
  const dispatch = useDispatch();

  // state
  const [sortSelected, setSortSelected] = useState("default");
  const [filterVehicle, setFilterVehicle] = useState<string[]>([]);
  const [filterPrice, setFilterPrice] = useState<number>(0);
  // state để kiểm tra xem có đang trượt thanh trượt giá hay không
  const [isSliding, setIsSliding] = useState(false);
  const [filterVehicleType, setFilterVehicleType] = useState<string[]>([]);

  // handle sort change
  const handleSortChange = async (value: string) => {
    setSortSelected(value);

    dispatch(
      setFilter({
        sortBy: value,
        page: 1,
      })
    );
  };

  // handle change filter price
  const handlePriceChange = (e: any) => {
    const value = parseInt(e.target.value, 10);
    setFilterPrice(value);
  };

  useEffect(() => {
    if (isSliding) return; // Nếu đang trượt thì không thực hiện gì
    const delayDebounce = setTimeout(async () => {
      if (filterPrice > 0) {
        dispatch(
          setFilter({
            minPrice: 0,
            maxPrice: filterPrice,
            page: 1,
          })
        );
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [filterPrice, dispatch, isSliding]);

  // handle change busType
  const handleVehicleTypeChange = async (value: string) => {
    let newVehicleType = [...filterVehicleType];
    if (newVehicleType.includes(value)) {
      newVehicleType = newVehicleType.filter((item) => item !== value);
    } else {
      newVehicleType.push(value);
    }

    setFilterVehicleType(newVehicleType);
    dispatch(
      setFilter({
        busType: newVehicleType,
        page: 1,
      })
    );
  };

  // handle resetFilter
  const handleResetFilter = () => {
    setFilterVehicle([]);
    setFilterPrice(0);
    setFilterVehicleType([]);
    dispatch(resetFilterTrips());
    dispatch(resetCurrentPageToFirst());
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
                      onMouseUp={() => setIsSliding(false)}
                      onTouchEnd={() => setIsSliding(false)}
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
