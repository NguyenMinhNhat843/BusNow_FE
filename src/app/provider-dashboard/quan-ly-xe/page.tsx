"use client";

import { busApi } from "@/api/busApi";
import { ResponseVehicle } from "@/api/DTO/getVehiclesApiDTO";
import { Pagination } from "@/api/DTO/routeApiDTO";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import VehicleItem from "../components/VehicleItem";
import { routeApi } from "@/api/routeApi";
import DetailVehicle from "./components/DetailVehicle";
import { TabCurrentEnum } from "./enum/TabCurrentEnum";

type Vehicle = {
  id: string;
  code: string;
  totalSeat: number;
  type: string;
  subType?: string;
};

const PER_PAGE = 5;

export default function ManagerBus() {
  // state
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 5,
    totalPage: 1,
    total: 5,
  });
  const [vehicles, setVehicles] = useState<ResponseVehicle[]>([]);
  const [openModelRoutes, setOpenModelRoutes] = useState<boolean>(false);
  const [routes, setRoutes] = useState<any[]>([]);
  const [hasFetchedRoutes, setHasFetchedRoutes] = useState(false);
  const [formData, setFormData] = useState({
    totalSeat: "",
    code: "",
    type: "",
    subType: "",
    routeId: "",
    departHour: "",
  });
  const [tabCurrent, setTabCurrent] = useState<TabCurrentEnum>(
    TabCurrentEnum.VEHICLE
  );
  const [vehicleList, setVehicleList] = useState<Vehicle[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [vehicleSelectedId, setVehicleSelectedId] = useState<string>("");

  // handle onClick a vehicleItem - navigate to detail vehicle tab
  const handleOnClickVehicleItem = (vehicleId: string) => {
    setTabCurrent(TabCurrentEnum.DETAIL_VEHICLE);
    setVehicleSelectedId(vehicleId);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      code: formData.code,
      totalSeat: Number(formData.totalSeat),
      busType: formData.subType || formData.type, // tùy cách backend xử lý
      routeId: formData.routeId,
      departHour: formData.departHour,
    };

    try {
      await busApi.createVehicle(body);
      toast.success("Thêm xe thành công!");
      fetchVehicles(); // reload lại list xe
      setFormData({
        totalSeat: "",
        code: "",
        type: "",
        subType: "",
        routeId: "",
        departHour: "",
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const totalPage = Math.ceil(vehicleList.length / PER_PAGE);
  const paginated = vehicleList.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  // fetch routes
  const fetchRoutes = async () => {
    try {
      const response = await routeApi.getRoutes(1, 10);
      setRoutes(response.data);
      setHasFetchedRoutes(true); // để không load lại nữa
    } catch (error) {
      toast.error("Có lỗi xảy ra khi get routes");
    }
  };

  // fetch vehicles
  const fetchVehicles = async () => {
    try {
      const response = await busApi.getVehicles(pagination.page);
      setVehicles(response.data);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (openModelRoutes) {
      fetchRoutes();
    }
  }, [openModelRoutes]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div>
      {tabCurrent === TabCurrentEnum.VEHICLE ? (
        <div className="">
          {/* Form */}
          <div className="bg-white p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Thêm xe mới</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
              <div>
                <label className="block mb-1 font-medium">Số ghế</label>
                <input
                  type="number"
                  name="totalSeat"
                  value={formData.totalSeat}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Biển số xe</label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="VD: 29A-123.45"
                  required
                />
              </div>

              {/* Loại xe */}
              <div>
                <label className="block mb-1 font-medium">Loại xe</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">-- Chọn loại --</option>
                  <option value="VIP">VIP</option>
                  <option value="LIMOUSINE">LIMOUSINE</option>
                  <option value="STANDARD">STANDARD</option>
                </select>
              </div>

              {/* routes */}
              <div className="col-span-3 rounded-md border border-slate-200">
                <select
                  name="routeId" // ← sửa ở đây
                  className="w-full p-2"
                  value={formData.routeId} // ← thêm cái này để binding đúng
                  onChange={handleChange}
                  onClick={() => {
                    if (!hasFetchedRoutes) fetchRoutes();
                  }}
                >
                  <option value="">Chọn tuyến đường</option>
                  {routes.map((route) => (
                    <option key={route.routeId} value={route.routeId}>
                      {route.origin?.name} → {route.destination?.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Giờ khởi hành */}
              <div className="col-span-3">
                <label className="block mb-1 font-medium">Giờ khởi hành</label>
                <input
                  type="text"
                  name="departHour"
                  placeholder="HH:mm (VD: 14:30)"
                  pattern="^([01]\d|2[0-3]):([0-5]\d)$"
                  value={formData.departHour}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div className="col-span-3">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                  Thêm xe
                </button>
              </div>
            </form>
          </div>

          {/* Danh sách xe */}
          <div className="">
            <div className="grid grid-cols-3 gap-4">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.vehicleId}
                  className="mb-4 cursor-pointer"
                  onClick={() => handleOnClickVehicleItem(vehicle.vehicleId)}
                >
                  <VehicleItem vehicle={vehicle} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPage > 1 && (
              <div className="flex justify-center mt-6 gap-2">
                {Array.from({ length: totalPage }, (_, i) => (
                  <button
                    key={i}
                    className={`px-3 py-1 rounded border ${
                      currentPage === i + 1
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <DetailVehicle
          vehicleId={vehicleSelectedId}
          setTabCurrent={setTabCurrent}
        />
      )}
    </div>
  );
}
