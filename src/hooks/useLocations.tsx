import { CreateLocationDto } from "@/apiGen/generated";
import { locationApi } from "@/apiGen/location.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useLocations = () => {
  const queryClient = useQueryClient();

  const useGetLocations = () => {
    return useQuery<any>({
      queryKey: ["locations"],
      queryFn: async () => {
        const response = await locationApi.locationControllerGetAllLocation();
        return response.data;
      },
      refetchOnWindowFocus: false,
    });
  };

  const useCreateLocation = () => {
    return useMutation({
      mutationFn: async (payload: CreateLocationDto) => {
        const response = await locationApi.locationControllerCreateLocation(
          payload
        );
        return response.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["locations"],
        });
      },
    });
  };

  return { useGetLocations, useCreateLocation };
};
