import {
  CancleTicketDTO,
  ConfirmCancleTicketDTO,
  SearchTicketDTO,
} from "@/apiGen/generated";
import { ticketApi } from "@/apiGen/ticketApi";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useTicket = () => {
  const useFetchMyTicket = () => {
    return useQuery<any>({
      queryKey: ["myticket"],
      queryFn: async () => {
        const response = await ticketApi.ticketControllerGetMyTicket();
        return response.data;
      },
      refetchOnWindowFocus: false,
    });
  };

  const useSearchTicket = (payload: SearchTicketDTO) => {
    return useQuery<any>({
      queryKey: ["tickets", payload],
      queryFn: async () => {
        const response = await ticketApi.ticketControllerSearchTicket(payload);
        return response.data;
      },
      enabled: Boolean(payload),
      refetchOnWindowFocus: false,
      staleTime: 15 * 60 * 1000,
    });
  };

  const useFetchTicketByPhone = () => {
    return useMutation({
      mutationFn: async ({ phone }: { phone: string }) => {
        const response = await ticketApi.ticketControllerFindTicketByPhone(
          phone
        );
        return response.data;
      },
    });
  };

  const useCancleTicket = () => {
    return useMutation({
      mutationFn: async (payload: CancleTicketDTO) => {
        const response = await ticketApi.ticketControllerCancleTicket(payload);
        return response.data;
      },
    });
  };

  const useConfirmOTPCancleTicket = () => {
    return useMutation({
      mutationFn: async (payload: ConfirmCancleTicketDTO) => {
        const response = await ticketApi.ticketControllerConfirmCancleTicket(
          payload
        );
        return response.data;
      },
    });
  };

  return {
    useFetchMyTicket,
    useFetchTicketByPhone,
    useSearchTicket,
    useCancleTicket,
    useConfirmOTPCancleTicket,
  };
};
