import { CreatePaymentDto } from "@/apiGen/generated";
import { VnpayApi } from "@/apiGen/vnPay.api";
import { useMutation } from "@tanstack/react-query";

export const useVnpay = () => {
  const useCreatePaymentUrl = () => {
    return useMutation<any, Error, any>({
      mutationFn: async (body: CreatePaymentDto) => {
        const response = await VnpayApi.vnpayControllerCreatePaymentUrl(body);
        return response.data;
      },
    });
  };

  return {
    useCreatePaymentUrl,
  };
};
