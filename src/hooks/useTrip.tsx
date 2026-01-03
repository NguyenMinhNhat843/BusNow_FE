import { GenTripDTO } from "@/apiGen/generated";
import { tripApi } from "@/apiGen/tripApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useTrip = () => {
  const queryClient = useQueryClient();

  const useFetchTrip = (
    vehicleId?: string,
    page: number = 1,
    limit: number = 6
  ) => {
    return useQuery<any>({
      queryKey: ["trips", vehicleId, page, limit],
      queryFn: async () => {
        const response = await tripApi.tripControllerGetTripsByVehicle(
          vehicleId!,
          page,
          limit
        );
        return response.data;
      },
      enabled: Boolean(vehicleId),
      refetchOnWindowFocus: false,
    });
  };

  const useGenTrip = () => {
    return useMutation<any, any, GenTripDTO>({
      mutationFn: async (body) => {
        const response = await tripApi.tripControllerGenTrips(body);
        return response.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["trips"],
        });
      },
      onError: () => {},
    });
  };

  const useDeleteTripsBeforeNow = () => {
    return useMutation<any>({
      mutationFn: async () => {
        const response = await tripApi.tripControllerDeleteTripsBeforeDate({});
        return response.data;
      },
      onSuccess: () => {
        alert("Xóa thành công");

        queryClient.invalidateQueries({
          queryKey: ["trips"],
        });
      },
      onError: (error: any) => {
        alert(error?.response?.data?.message || "Có lỗi");
      },
    });
  };

  return {
    useGenTrip,
    useDeleteTripsBeforeNow,
    useFetchTrip,
  };
};
