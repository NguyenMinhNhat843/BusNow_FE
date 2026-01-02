import {
  CancleTicketDTO,
  ConfirmCancleTicketDTO,
  CreateTIcketDTO,
  SearchTicketDTO,
} from "@/apiGen/generated";
import { ticketApi } from "@/apiGen/ticketApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useTicket = () => {
  const queryClient = useQueryClient();
  const useCreateTicket = () => {
    return useMutation({
      mutationFn: async (payload: CreateTIcketDTO) => {
        const response = await ticketApi.ticketControllerCreateTicket(payload);
        return response.data;
      },
      onError: (err: any) => {
        alert("Lỗi khi đặt vé: " + err.message);
      },
    });
  };

  const useFetchMyTicket = () => {
    return useQuery<any>({
      queryKey: ["tickets", "me"],
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

  const useGetTicketByTrip = (tripId: string) => {
    return useQuery<any>({
      queryKey: ["tickets", tripId],
      queryFn: async () => {
        const response = await ticketApi.ticketControllerGetTicketsByTrip(
          tripId
        );
        return response.data;
      },
      enabled: Boolean(tripId),
      refetchOnWindowFocus: false,
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

  const useDeleteTicket = () => {
    return useMutation({
      mutationFn: async (ticketId: string) => {
        const response = await ticketApi.ticketControllerDeleteTicket(ticketId);
        return response.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["tickets"],
        });
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
    useDeleteTicket,
    useGetTicketByTrip,
    useCreateTicket,
  };
};
