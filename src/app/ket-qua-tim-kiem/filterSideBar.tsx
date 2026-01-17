import { sortOptions } from "./type";
import { useKetQuaTimKiemContext } from "./KetQuaTimKiemContext";
import { Radio, Text, Checkbox, Divider } from "@mantine/core";

const VEHICLE_OPTIONS = [
  { label: "Xe thường", value: "STANDARD" },
  { label: "Xe VIP", value: "VIP" },
  { label: "Xe limousine", value: "LIMOUSINE" },
];

const FilterSideBar = () => {
  const { setSearchFilter, searchFilter } = useKetQuaTimKiemContext();

  const handleSortChange = (value: string) => {
    setSearchFilter((prev) =>
      prev
        ? { ...prev, sortBy: value === "default" ? undefined : value }
        : prev,
    );
  };

  const handleVehicleTypeChange = (value: string) => {
    setSearchFilter((prev) => {
      if (!prev) return prev;
      const currentTypes = prev.busType || [];
      const newTypes = currentTypes.includes(value)
        ? currentTypes.filter((t) => t !== value)
        : [...currentTypes, value];

      return {
        ...prev,
        busType: newTypes.length > 0 ? newTypes : undefined,
      };
    });
  };

  const handleResetFilter = () => {
    setSearchFilter((prev) =>
      prev ? { ...prev, sortBy: undefined, busType: undefined } : prev,
    );
  };

  return (
    <div className="flex flex-col gap-4 w-full md:w-[260px]">
      {/* Khối Sắp xếp */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
        <Text className="font-bold text-slate-800 mb-3 px-1">Sắp xếp</Text>
        <Radio.Group
          value={searchFilter?.sortBy || "default"}
          onChange={handleSortChange}
          className="flex flex-col gap-2"
        >
          {sortOptions.map((item) => (
            <div
              key={item.value}
              className="px-2 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Radio
                value={item.value}
                label={item.label}
                color="blue"
                styles={{
                  label: { cursor: "pointer", width: "100%" },
                  radio: { cursor: "pointer" },
                }}
              />
            </div>
          ))}
        </Radio.Group>
      </div>

      {/* Khối Lọc */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
        <div className="flex justify-between items-center mb-4 px-1">
          <Text className="font-bold text-slate-800">Lọc chuyến đi</Text>
          <button
            onClick={handleResetFilter}
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            Xóa lọc
          </button>
        </div>

        <Divider className="mb-4" />

        <div className="space-y-4">
          <div>
            <Text className="font-semibold text-sm text-slate-600 mb-3 px-1">
              Loại xe
            </Text>
            <div className="flex flex-col gap-2">
              {VEHICLE_OPTIONS.map((option) => (
                <div
                  key={option.value}
                  className="px-2 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <Checkbox
                    label={option.label}
                    checked={
                      searchFilter?.busType?.includes(option.value) || false
                    }
                    onChange={() => handleVehicleTypeChange(option.value)}
                    color="blue"
                    styles={{
                      label: { cursor: "pointer", width: "100%" },
                      input: { cursor: "pointer" },
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;
