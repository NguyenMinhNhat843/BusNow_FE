import { Badge, Card, Grid, Group, Text } from "@mantine/core";
import React from "react";

interface TicketItemProps {
  ticketId: string;
  status: string;
  createdAt: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  seatId: string;
  seatCode: number;
  paymentId: string;
  amount: number;
  paymentTime: string;
  paymentStatus: string;
}

const TicketItem = ({ ticket }: { ticket: TicketItemProps }) => {
  const {
    ticketId,
    status,
    createdAt,
    firstName,
    lastName,
    email,
    phoneNumber,
    seatCode,
    amount,
    paymentTime,
    paymentStatus,
  } = ticket;

  const fields = [
    {
      label: "Trạng thái",
      value: status,
      color: status === "PAID" ? "green" : "red",
      isBadge: true,
    },
    {
      label: "Ngày đặt",
      value: new Date(createdAt).toLocaleString(),
    },
    {
      label: "Tên khách",
      value: `${firstName} ${lastName}`,
    },
    {
      label: "Email",
      value: email,
    },
    {
      label: "SĐT",
      value: phoneNumber ?? "Chưa có",
    },
    {
      label: "Mã ghế",
      value: seatCode,
    },
    {
      label: "Thanh toán",
      value: `${amount.toLocaleString()} đ`,
    },
    {
      label: "Tình trạng thanh toán",
      value: paymentStatus,
      color: paymentStatus === "PAID" ? "green" : "orange",
      isBadge: true,
    },
    {
      label: "Thời gian thanh toán",
      value: paymentTime ? new Date(paymentTime).toLocaleString() : "—",
    },
  ];
  return (
    <Card withBorder radius="md" padding="md">
      {/* Header */}
      <Group justify="space-between" mb="sm">
        <Text fw={600}>Mã vé: {ticketId}</Text>
        <Badge variant="light" color="blue">
          Vé
        </Badge>
      </Group>

      {/* Body */}
      <Grid gutter="xs">
        {fields.map((f) => (
          <Grid.Col key={f.label} span={{ base: 12, sm: 6 }}>
            <Text size="xs" c="dimmed">
              {f.label}
            </Text>

            {f.isBadge ? (
              <Badge color={f.color} variant="light">
                {f.value}
              </Badge>
            ) : (
              <Text fw={500}>{f.value}</Text>
            )}
          </Grid.Col>
        ))}
      </Grid>
    </Card>
  );
};

export default TicketItem;
