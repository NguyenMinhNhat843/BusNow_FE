"use client";
import { UserInterface } from "@/api/DTO/localStorage";
import { Pagination } from "@/api/DTO/routeApiDTO";
import { useState } from "react";
import RouteItem from "../components/RouteItem";
import SelectStopPoint from "../components/SelectStopPoint";
import { Text } from "@mantine/core";
import { useRoute } from "@/hooks/useRoute";

export default function Tab_TuyenDuong() {
  // common
  const userLocal = localStorage.getItem("user");
  let userJson: UserInterface | null = null;
  if (userLocal) {
    userJson = JSON.parse(userLocal);
  }

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 1,
  });

  // fetch routes
  const { routes, error } = useRoute({
    page: pagination.page,
    limit: pagination.limit,
  });

  if (userJson === null) {
    return <div>User chưa đăng nhập</div>;
  }

  if (error) alert("Có lỗi khi fetch routes: " + JSON.stringify(error));

  return (
    <div>
      <Text fw={700} size="xl" className="!text-blue-700 !mt-4">
        Quản lý tuyến đường
      </Text>

      <SelectStopPoint />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
        {routes?.data?.map((route: any, index: number) => (
          <div key={index}>
            <RouteItem route={route} />
          </div>
        ))}
      </div>
    </div>
  );
}
