import { SortTicketEnum } from "../Enum/sortTicketEnum";
import { ticketStatusEnum } from "../Enum/ticketStatusEnum";

interface requestFilterTicketApi {
  numberPerPage: number;
  page: number;
  userId?: string;
  time?: {
    startTime?: string;
    endTime?: string;
  };
  ticketStatus?: ticketStatusEnum | "";
  sortBy?: SortTicketEnum | "";
}

export interface ResponseFilterTicketApi {
  status: "success" | "failed";
  pagination: {
    page: number;
    numberPerPage: number;
    total: number;
    totalPage: number;
  };
  tickets: Ticket[];
}

export interface Ticket {
  ticketId: string;
  ticketTime: string;
  status: string;
  departLocation: {
    locationDetailId: string;
    name: string;
  };
  arrivalLocation: {
    locationDetailId: string;
    name: string;
  };
  user: {
    userId: string;
    avatar: string;
    firstName: string;
    lastName: string;
    birthDate: string | null;
    address: string | null;
    email: string;
    phoneNumber: string;
    password: string;
    provider: string | null;
    isActive: boolean;
    role: string;
  };
  trip: {
    tripId: string;
    price: number;
    departTime: string;
    arriveTime: string;
    availabelSeat: number;
    fromLocationName: string;
    toLocationName: string;
    codeNumber: string;
  };
  seat: {
    seatId: string;
    seatCode: string;
    isBooked: boolean;
    typeSeat: string | null;
  };
  payment: {
    paymentId: string;
    amount: number;
    paymentTime: string;
    method: string;
    status: string;
  };
  seatCode: string;
}

export type { requestFilterTicketApi };
