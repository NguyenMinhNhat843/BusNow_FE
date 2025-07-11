import { locationApi } from "@/api/locationApi";
import { routeApi } from "@/api/routeApi";
import { stopPointApi } from "@/api/stopPointApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Location {
  locationId: string;
  name: string;
}

export default function CreateRouteForm() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [formData, setFormData] = useState({
    originId: "",
    destinationId: "",
    duration: 0,
    restAtDestination: 0,
    repeatsDay: 0,
  });
  const [originSP, setOriginSP] = useState<any[]>([]);
  const [destinationSP, setDestinationSP] = useState<any[]>([]);
  const [selectedOriginSP, setSelectedOriginSP] = useState<any[]>([]);
  const [selectedDestinationSP, setSelectedDestinationSP] = useState<any[]>([]);

  // fetch locations
  const fetchLocations = async () => {
    try {
      const response = await locationApi.getAllLocation();
      setLocations(response);
    } catch (error) {
      toast.error("Không thể tải danh sách địa điểm!");
    }
  };
  useEffect(() => {
    fetchLocations();
  }, []);

  // fetch stopPoint
  useEffect(() => {
    const loadStopPoints = async () => {
      if (formData.originId) {
        try {
          const response = await stopPointApi.getStopPintBycityId(
            formData.originId
          );
          setOriginSP(response.data); // ✅ response.data là mảng
        } catch (error) {
          toast.error("Lỗi khi lấy điểm đón!");
          setOriginSP([]);
        }
      } else {
        setOriginSP([]);
      }
    };

    loadStopPoints();
  }, [formData.originId]);

  useEffect(() => {
    const fetchData = async () => {
      if (formData.destinationId) {
        try {
          const response = await stopPointApi.getStopPintBycityId(
            formData.destinationId
          );
          setDestinationSP(response.data || []); // đảm bảo luôn là array
        } catch (error) {
          toast.error("Lỗi khi lấy điểm trả!");
          setDestinationSP([]);
        }
      } else {
        setDestinationSP([]);
      }
    };

    fetchData();
  }, [formData.destinationId]);

  // handle change form
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle select point
  const handleSelectStopPoint = (
    id: string,
    list: any[],
    setList: (value: any[]) => void,
    options: any[]
  ) => {
    const alreadySelected = list.find((item) => item.id === id);
    if (alreadySelected) return; // tránh trùng
    const selected = options.find((item) => item.id === id);
    if (selected) setList([...list, selected]);
  };

  // handle remove point
  const handleRemoveStopPoint = (
    id: string,
    list: any[],
    setList: (value: any[]) => void
  ) => {
    setList(list.filter((item) => item.id !== id));
  };

  // handle submit create
  const handleCreateRouteApi = async () => {
    const stopPointIds = [...selectedOriginSP, ...selectedDestinationSP].map(
      (sp) => sp.id
    );

    const body = {
      originId: formData.originId,
      destinationId: formData.destinationId,
      duration: Number(formData.duration),
      restAtDestination: Number(formData.restAtDestination),
      stopPointIds,
    };

    try {
      const res = await routeApi.createRoute(body); // ← gọi API ở đây
      toast.success("Tạo tuyến đường thành công!");
      // reset nếu muốn
      setFormData({
        originId: "",
        destinationId: "",
        duration: 0,
        restAtDestination: 0,
        repeatsDay: 0,
      });
      setSelectedOriginSP([]);
      setSelectedDestinationSP([]);
    } catch (error: any) {
      toast.error("Tạo tuyến đường thất bại!");
      console.error(error);
    }
  };

  return (
    <form className="p-4 rounded-2xl bg-white shadow-md mb-6 border border-gray-200 mx-auto">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Tạo tuyến đường
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Điểm đi */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Điểm đi (Origin)
            </label>
            <select
              name="originId"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={formData.originId}
              onChange={handleInputChange}
            >
              <option value="">-- Chọn địa điểm đi --</option>
              {locations.map((loc) => (
                <option key={loc.locationId} value={loc.locationId}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          {/* Điểm đến */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Điểm đến (Destination)
            </label>
            <select
              name="destinationId"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={formData.destinationId}
              onChange={handleInputChange}
            >
              <option value="">-- Chọn địa điểm đến --</option>
              {locations.map((loc) => (
                <option key={loc.locationId} value={loc.locationId}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Thời gian và nghỉ */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Thời gian di chuyển (giờ)
          </label>
          <input
            type="number"
            name="duration"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            placeholder="VD: 7"
            value={formData.duration}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">
            Thời gian nghỉ tại điểm đến
          </label>
          <input
            type="number"
            name="restAtDestination"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            placeholder="VD: 4"
            value={formData.restAtDestination}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">
            Lặp lại mỗi (ngày)
          </label>
          <input
            type="number"
            name="repeatsDay"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full cursor-not-allowed"
            value={Math.ceil(
              ((Number(formData.duration) || 0) * 2 +
                (Number(formData.restAtDestination) || 0)) /
                8
            )}
            disabled
          />
        </div>
      </div>

      {/* Điểm đón - trả */}
      <div className="grid grid-cols-2 gap-6">
        {/* Điểm đón */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            🚏 Chọn điểm đón (Origin)
          </label>
          {originSP.length > 0 && (
            <div className="mt-2">
              <select
                className="p-2 border border-gray-300 rounded-md w-full"
                onChange={(e) =>
                  handleSelectStopPoint(
                    e.target.value,
                    selectedOriginSP,
                    setSelectedOriginSP,
                    originSP
                  )
                }
              >
                <option value="">-- Chọn điểm đón --</option>
                {originSP.map((sp: any) => (
                  <option key={sp.id} value={sp.id}>
                    {sp.name}
                  </option>
                ))}
              </select>

              {/* Hiển thị các điểm đã chọn */}
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedOriginSP.map((sp) => (
                  <span
                    key={sp.id}
                    className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm flex items-center gap-2"
                  >
                    {sp.name}
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveStopPoint(
                          sp.id,
                          selectedOriginSP,
                          setSelectedOriginSP
                        )
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Điểm trả */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            🎯 Chọn điểm trả (Destination)
          </label>
          {destinationSP.length > 0 && (
            <div className="mt-2">
              <select
                className="p-2 border border-gray-300 rounded-md w-full"
                onChange={(e) =>
                  handleSelectStopPoint(
                    e.target.value,
                    selectedDestinationSP,
                    setSelectedDestinationSP,
                    destinationSP
                  )
                }
              >
                <option value="">-- Chọn điểm trả --</option>
                {destinationSP.map((sp: any) => (
                  <option key={sp.id} value={sp.id}>
                    {sp.name}
                  </option>
                ))}
              </select>

              {/* Hiển thị các điểm đã chọn */}
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedDestinationSP.map((sp) => (
                  <span
                    key={sp.id}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center gap-2"
                  >
                    {sp.name}
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveStopPoint(
                          sp.id,
                          selectedDestinationSP,
                          setSelectedDestinationSP
                        )
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 text-right">
        <button
          type="submit"
          className="bg-yellow-500 text-white font-medium px-6 py-2 rounded-md hover:bg-yellow-600"
          onClick={handleCreateRouteApi}
        >
          ✅ Tạo tuyến đường
        </button>
      </div>
    </form>
  );
}
