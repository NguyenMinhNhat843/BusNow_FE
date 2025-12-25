import { Badge, Group, Paper, Stack, Text } from "@mantine/core";
import { FunctionComponent } from "react";

interface TicketItemProps {
  ticket?: any;
}

const TicketItem: FunctionComponent<TicketItemProps> = ({ ticket }) => {
  if (!ticket) return;
  const { status, trip, seat } = ticket;
  const { vehicle } = trip;
  const { route } = vehicle;
  const { origin, destination } = route;
  return (
    <Paper key={ticket.ticketId} shadow="sm" radius="md" p="md" withBorder>
      <Group justify="space-between" align="flex-start">
        {/* BÊN TRÁI: thông tin chính */}
        <Stack gap={6}>
          {/* Nhà xe */}
          <Text fw={600}>{vehicle?.provider?.lastName ?? "—"}</Text>

          {/* Mã xe + ghế */}
          <Group gap="md">
            <Text size="sm">
              Xe: <b>{vehicle?.code ?? "—"}</b>
            </Text>
            <Text size="sm">
              Ghế: <b>{seat?.seatCode ?? "—"}</b>
            </Text>
          </Group>

          {/* Tuyến */}
          <Text size="sm" c="dimmed">
            {origin?.name} → {destination?.name}
          </Text>
        </Stack>

        {/* BÊN PHẢI: trạng thái + giờ */}
        <Stack gap={8} align="flex-end">
          <Badge
            color={
              status === "PAID"
                ? "green"
                : status === "PENDING"
                ? "yellow"
                : "gray"
            }
            variant="light"
          >
            {status}
          </Badge>

          <Text size="xs" c="dimmed">
            Xuất bến
          </Text>
          <Text size="sm" fw={500}>
            {trip?.departDate
              ? new Date(trip.departDate).toLocaleString("vi-VN")
              : "—"}
          </Text>
        </Stack>
      </Group>
    </Paper>
  );
};

export default TicketItem;
