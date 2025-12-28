import { SearchRefundRequestDTO } from "@/apiGen/generated";
import { refundRequestApi } from "@/apiGen/refundRequest.api";
import { useQuery } from "@tanstack/react-query";

export const useRefundRequest = () => {
  const useSearchRefundRequest = (payload: SearchRefundRequestDTO) => {
    return useQuery<any>({
      queryKey: ["refundRequests", payload],
      queryFn: async () => {
        const response =
          await refundRequestApi.refundRequestControllerSearchRefundRequest(
            payload
          );
        return response.data;
      },
    });
  };

  return {
    useSearchRefundRequest,
  };
};
