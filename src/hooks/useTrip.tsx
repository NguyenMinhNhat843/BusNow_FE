import { GenTripDTO } from "@/apiGen/generated";
import {
  tripControllerDeleteTripsBeforeDate,
  tripControllerGenTrips,
  tripControllerSearchTrip,
  TripControllerSearchTripParams,
} from "@/apiOrval/bussNowAPI";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useTrip = () => {
  const queryClient = useQueryClient();

  const useSearchTrip = (params?: TripControllerSearchTripParams) => {
    return useQuery<any>({
      queryKey: ["searchTrips", params],
      queryFn: async () => {
        const response = await tripControllerSearchTrip(params!);
        return response.data;
      },
      enabled: Boolean(params),
      retry: false,
      refetchOnWindowFocus: false,
    });
  };

  const useGenTrip = () => {
    return useMutation<any, any, GenTripDTO>({
      mutationFn: async (body: GenTripDTO) => {
        const response = await tripControllerGenTrips(body);
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
        const response = await tripControllerDeleteTripsBeforeDate({});
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
    useSearchTrip,
  };
};
