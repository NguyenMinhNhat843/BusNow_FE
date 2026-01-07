import { axiosInstance } from "@/apiGen";
import { useMutation } from "@tanstack/react-query";

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

  return {
    createBusCompanyRequest,
    isPendingCreateBusCompanyRequest,
  };
};
