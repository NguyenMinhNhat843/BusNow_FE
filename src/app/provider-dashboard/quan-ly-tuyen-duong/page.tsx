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
import RouteItem from "../components/RouteItem";
import SelectStopPoint from "../components/SelectStopPoint";

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

  // fetch routes
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
    <div className="p-2">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4 text-blue-600">
        Quản lý tuyến đường
      </h2>

      {/* Form thêm route */}
      <SelectStopPoint />

      {/* Danh sách tuyến đường */}
      <div className="grid grid-cols-2 gap-4">
        {routes.map((route, index) => (
          <div key={index}>
            <RouteItem route={route} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-4 items-center space-x-4">
        <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">
          &lt;
        </button>
        <span>
          {pagination.page} / <span>{pagination.totalPage}</span>
        </span>
        <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">
          &gt;
        </button>
      </div>
    </div>
  );
}
