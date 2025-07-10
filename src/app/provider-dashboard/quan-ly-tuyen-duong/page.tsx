"use client";
import { UserInterface } from "@/api/DTO/localStorage";
import {
  Pagination,
  RequestCreateRoute,
  RequestGetRoutes,
  ResponseGetRoutes,
} from "@/api/DTO/routeApiDTO";
import { locationApi } from "@/api/locationApi";
import { routeApi } from "@/api/routeApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ManagerRoute() {
  // common
  const userLocal = localStorage.getItem("user");
  let userJson: UserInterface | null = null;
  if (userLocal) {
    userJson = JSON.parse(userLocal);
  }

  // state
  const [locations, setLocations] = useState<ResponseGetAllLocations[]>([]);
  const [dataSubmit, setDataSubmit] = useState<RequestCreateRoute>({
    originId: "",
    destinationId: "",
    duration: 0,
    restAtDestination: 0,
    providerId: userJson?.userId ?? "",
    repeatsDay: 0,
  });
  const [routes, setRoutes] = useState<ResponseGetRoutes[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 1,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  // handle change Datasubmit
  const handleChangeDataSubmit = (e: any) => {
    const { name, value } = e.target;

    const parsedValue =
      name === "restAtDestination" || name === "duration"
        ? Number(value)
        : value;

    setDataSubmit((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  // handle load routes
  const fetchRoutesPagination = async (page: number, limit: number) => {
    setLoading(true);
    try {
      let response = null;
      response = await routeApi.getRoutes(page, limit);
      if (response.status === "success") {
        setRoutes(response.data);
        setPagination(response.pagination);
      }
    } catch (error) {
      toast.error("Có lỗi!!!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutesPagination(pagination.page, pagination.limit);
  }, []);

  // handle nexxt page

  // handle add route
  const handleAddRoute = async () => {
    try {
      dataSubmit.repeatsDay = Math.ceil(
        (dataSubmit.duration * 2 + dataSubmit.restAtDestination) / 8
      );
      console.log(dataSubmit);
      const response = await routeApi.createRoute(dataSubmit);
      toast.success("Thêm route thành công");
      fetchRoutesPagination(pagination.page, pagination.limit);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // fetch data location
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await locationApi.getAllLocation();
        setLocations(response);
      } catch (error) {
        toast.error(JSON.stringify(error));
      }
    };

    fetchLocations();
  }, []);

  if (userJson === null) {
    return <div>User chưa đăng nhập</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      <h2 className="text-xl font-bold mb-4">Quản lý tuyến đường</h2>

      {/* Form thêm route */}
      <div className="bg-gray-100 p-4 rounded-lg shadow mb-6">
        <h3 className="font-semibold mb-2">Thêm tuyến đường mới</h3>
        <div className="grid grid-cols-3 gap-4">
          <select
            value={dataSubmit.originId}
            name="originId"
            onChange={(e) => handleChangeDataSubmit(e)}
            className="bg-white rounded-md p-2 cursor-pointer"
          >
            <option value="">-- Chọn điểm gốc --</option>
            {locations.map((l) => {
              return (
                <option key={l.locationId} value={l.locationId}>
                  {l.name}
                </option>
              );
            })}
          </select>
          <select
            value={dataSubmit.destinationId}
            name="destinationId"
            onChange={(e) => handleChangeDataSubmit(e)}
            className="bg-white rounded-md p-2 cursor-pointer"
          >
            <option value="">-- Chọn điểm đến --</option>
            {locations.map((l) => {
              return (
                <option key={l.locationId} value={l.locationId}>
                  {l.name}
                </option>
              );
            })}
          </select>

          <input
            type="number"
            name="duration"
            placeholder="Thời gian (giờ)"
            className="p-2 border rounded bg-white"
            value={dataSubmit.duration}
            onChange={handleChangeDataSubmit}
          />
        </div>
        <div className="">
          <div className="pt-4">
            <label htmlFor="" className="inline-block w-[400px]">
              Khi đến đích tài xế được nghỉ:{" "}
            </label>
            <input
              type="number"
              name="restAtDestination"
              placeholder="Thời gian nghỉ"
              className="p-2 border rounded"
              value={dataSubmit.restAtDestination}
              onChange={handleChangeDataSubmit}
            />
          </div>
        </div>

        <button
          onClick={handleAddRoute}
          className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Thêm tuyến
        </button>
      </div>

      {/* Danh sách tuyến */}
      <table className="w-full border shadow rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left">STT</th>
            <th className="p-3 text-left">Xuất phát</th>
            <th className="p-3 text-left">Điểm đến</th>
            <th className="p-3 text-left">Thời gian (giờ)</th>
            <th className="p-3 text-left">Thời gian nghỉ</th>
          </tr>
        </thead>
        <tbody>
          {routes &&
            routes.map((route: ResponseGetRoutes, index) => (
              <tr key={route.routeId} className="border-t">
                <td className="p-3">
                  {(pagination?.page - 1) * pagination.limit + index + 1}
                </td>
                <td className="p-3">{route.origin.name}</td>
                <td className="p-3">{route.destination.name}</td>
                <td className="p-3">{route.duration}</td>
                <td className="p-3">{route.restAtDestination}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end mt-4 items-center space-x-4">
        <button
          // disabled={currentPage === 1}
          // onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          &lt;
        </button>
        <span>
          {pagination.page} / <span>{pagination.totalPage}</span>
        </span>
        <button
          // disabled={currentPage === totalPages}
          // onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
