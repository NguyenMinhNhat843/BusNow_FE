import format from "@/utils/format";
import { Badge, Table, TableData, Text } from "@mantine/core";
import { FunctionComponent } from "react";

interface TicketListProps {
  tickets: any;
}

const TicketList: FunctionComponent<TicketListProps> = ({ tickets }) => {
  if (!tickets || tickets.length === 0)
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Text size="lg" c="dimmed" fw={600}>
          Không có vé nào
        </Text>
      </div>
    );

  const dataTable: TableData = {
    head: [
      "Trạng thái",
      "Ngày đặt",
      "Tên khách",
      "Email",
      "SĐT",
      "Mã ghế",
      "Thanh toán",
      "Tình trạng thanh toán",
      "Thời gian thanh toán",
    ],
    body: tickets?.map((ticket: any) => {
      return [
        ticket.status,
        format.formatDate(ticket.createdAt),
        `${ticket.firstName} ${ticket.lastName}`,
        ticket.email,
        ticket.phoneNumber,
        ticket.seatCode,
        format.formatMoneyVND(ticket.amount),
        ticket.paymentStatus,
        format.formatDate(ticket.paymentTime),
      ];
    }),
  };

  return (
    <div>
      <Badge variant="light" color="blue">
        {tickets.length} vé
      </Badge>

      <Table data={dataTable} />
    </div>
  );
};

export default TicketList;
