import { busApi } from "@/api/busApi";
import { vehicleApi } from "@/apiGen/vehicleApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useVehicle = () => {
  const queryClient = useQueryClient();

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

  const useAddVehicle = () => {
    return useMutation({
      mutationFn: (payload: any) => busApi.createVehicle(payload),

      onSuccess: () => {
        // refetch list xe sau khi tạo
        queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      },

      onError: (error: any) => {
        alert(error?.response?.data?.message || "Có lỗi khi thêm xe");
      },
    });
  };

  return {
    useAddVehicle,
    useGetVehicles,
    useGetVehicleById,
  };
};
