"use client";
import { UserInterface } from "@/api/DTO/localStorage";
import { Pagination, ResponseGetRoutes } from "@/api/DTO/routeApiDTO";
import { routeApi } from "@/api/routeApi";
import { useEffect, useState } from "react";
import RouteItem from "../components/RouteItem";
import SelectStopPoint from "../components/SelectStopPoint";
import { Text } from "@mantine/core";

export default function Tab_TuyenDuong() {
  // common
  const userLocal = localStorage.getItem("user");
  let userJson: UserInterface | null = null;
  if (userLocal) {
    userJson = JSON.parse(userLocal);
  }

  const [routes, setRoutes] = useState<ResponseGetRoutes[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 1,
  });

  // fetch routes
  const fetchRoutesPagination = async (page: number, limit: number) => {
    try {
      let response = null;
      response = await routeApi.getRoutes(page, limit);
      if (response.status === "success") {
        setRoutes(response.data);
        setPagination(response.pagination);
      }
    } catch (error) {
      alert("Có lỗi: " + JSON.stringify(error));
    }
  };

  useEffect(() => {
    fetchRoutesPagination(pagination.page, pagination.limit);
  }, []);

  if (userJson === null) {
    return <div>User chưa đăng nhập</div>;
  }

  return (
    <div>
      <Text fw={700} size="xl" className="!text-blue-700 !mt-4">
        Quản lý tuyến đường
      </Text>

      <SelectStopPoint />

      <div className="grid grid-cols-1 xl:grid-cols-2  gap-2">
        {routes.map((route, index) => (
          <div key={index}>
            <RouteItem route={route} />
          </div>
        ))}
      </div>
    </div>
  );
}
