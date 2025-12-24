import { busApi } from "@/api/busApi";
import { vehicleApi } from "@/apiGen/vehicleApi";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";

export const useVehicle = () => {
  const [loading, setLoading] = useState(false);

  const useGetVehicles = (page: number = 1, limit: number = 10) => {
    return useQuery<any>({
      queryKey: ["vehicles", page, limit],
      queryFn: async () => {
        const res = await vehicleApi.vehicleControllerGetVehicles(
          undefined,
          limit,
          page
        );
        return res.data;
      },
      refetchOnWindowFocus: false,
    });
  };

  const useGetVehicleById = (id: string) => {
    return useQuery<any>({
      queryKey: ["vehicle", id],
      queryFn: async () => {
        const res = await vehicleApi.vehicleControllerGetVehicleById(id);
        return res.data;
      },
    });
  };

  // ===== Add =====
  const addVehicle = useCallback(async (payload: any) => {
    try {
      setLoading(true);
      await busApi.createVehicle(payload);
    } catch (error: any) {
      alert(error?.response?.data?.message || "Có lỗi khi thêm xe");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    addVehicle,
    useGetVehicles,
    useGetVehicleById,
  };
};
