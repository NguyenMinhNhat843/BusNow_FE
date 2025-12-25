import { axiosInstance, config } from "./index";
import { TicketApi } from "./generated";

export const ticketApi = new TicketApi(config, "", axiosInstance);
