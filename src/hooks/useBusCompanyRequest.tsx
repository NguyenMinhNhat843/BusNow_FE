import { axiosInstance } from "@/apiGen";
import { busCompanyRequestApi } from "@/apiGen/busCompanyRequest.api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useBusCompanyRequest = () => {
  const {
    mutate: createBusCompanyRequest,
    isPending: isPendingCreateBusCompanyRequest,
  } = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await axiosInstance.post("/bus-company-requests", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
  });

  const useGetBusCompanyRequest = () => {
    return useQuery<any>({
      queryKey: ["busCompanyRequests"],
      queryFn: async () => {
        const res =
          await busCompanyRequestApi.busCompanyRequestControllerGetList();
        return res.data;
      },
    });
  };

  return {
    createBusCompanyRequest,
    isPendingCreateBusCompanyRequest,
    useGetBusCompanyRequest,
  };
};
