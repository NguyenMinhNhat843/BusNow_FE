import { busApi } from "@/api/busApi";
import { ResponseVehicle } from "@/api/DTO/getVehiclesApiDTO";
import { useCallback, useEffect, useState } from "react";

export const useVehicle = () => {
  const [vehicles, setVehicles] = useState<ResponseVehicle[]>([]);
  const [loading, setLoading] = useState(false);

  // ==== fetch ====
  const fetchVehicles = useCallback(async () => {
    try {
      setLoading(true);
      const response = await busApi.getVehicles(1);
      setVehicles(response.data);
    } catch (error: any) {
      alert(error?.response?.data?.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  // ===== Add =====
  const addVehicle = useCallback(
    async (payload: any) => {
      try {
        setLoading(true);
        await busApi.createVehicle(payload);
        await fetchVehicles();
      } catch (error: any) {
        alert(error?.response?.data?.message || "Có lỗi khi thêm xe");
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [fetchVehicles]
  );

  return {
    vehicles,
    loading,
    reload: fetchVehicles,
    addVehicle,
  };
};
