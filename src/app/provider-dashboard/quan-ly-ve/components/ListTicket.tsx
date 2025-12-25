import TicketItem from "@/component/TicketItem";
import { FunctionComponent } from "react";

interface ListTicketProps {
  tickets: any;
}

const ListTicket: FunctionComponent<ListTicketProps> = ({ tickets }) => {
  return (
    <>
      {tickets?.map((ticket: any) => {
        return (
          <div key={ticket.ticketId} className="mb-3">
            <TicketItem ticket={ticket} />
          </div>
        );
      })}
    </>
  );
};

export default ListTicket;
