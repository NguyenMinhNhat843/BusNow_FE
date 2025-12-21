import { CreateRouteDTO } from "@/apiGen/generated";
import { routeApi } from "@/apiGen/route.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface UseRouteParams {
  page?: number;
  limit?: number;
}

interface DeleteRouteParams {
  routeId: string;
}

export const useRoute = ({ page = 1, limit = 10 }: UseRouteParams = {}) => {
  const {
    data: routes = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<any>({
    queryKey: ["routes", page, limit],
    queryFn: async () => {
      const response = await routeApi.routeControllerGetRoutes(limit, page);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  return { routes, isLoading, isError, error, refetch };
};

export const useDeleteRoute = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteRoute, isPending: isPendingDeleteRoute } = useMutation({
    mutationFn: async ({ routeId }: DeleteRouteParams) => {
      const response = await routeApi.routeControllerDeleteRoute(routeId);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["routes"],
      });
      alert("✅ Xóa thành công");
    },
    onError: (error) => {
      alert("❌ Xóa route thất bại, lỗi: " + JSON.stringify(error.message));
    },
  });

  return {
    deleteRoute,
    isPendingDeleteRoute,
  };
};

export const useCreateRoute = () => {
  const queryClient = useQueryClient();

  const { mutate: createRoute, isPending: isPendingCreateRoute } = useMutation({
    mutationFn: async (payload: CreateRouteDTO) => {
      const response = await routeApi.routeControllerCreateRoute(payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["routes"],
      });
    },
  });

  return {
    createRoute,
    isPendingCreateRoute,
  };
};
