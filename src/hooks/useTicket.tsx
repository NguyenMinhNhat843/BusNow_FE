import { ticketApi } from "@/apiGen/ticketApi";
import { useQuery } from "@tanstack/react-query";

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

  return {
    useFetchMyTicket,
  };
};
