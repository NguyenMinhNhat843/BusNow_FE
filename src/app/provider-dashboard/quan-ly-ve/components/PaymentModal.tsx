"use client";

import { Modal, Group, Text, Button, Divider, Stack } from "@mantine/core";
import format from "@/utils/format";
import { useTicket } from "@/hooks/useTicket";
import { SearchTicketDTOStatusPaymentEnum } from "@/apiGen/generated";

interface PaymentModalProps {
  opened: boolean;
  onClose: () => void;
  ticket: any;
  mode: "confirm" | "view";
}

const PaymentModal = ({ opened, onClose, ticket, mode }: PaymentModalProps) => {
  const { updateTicket, isPendingUpdateTicket } = useTicket();
  if (!ticket) return null;

  const routeName = `${ticket.trip.vehicle.route.origin.name} → ${ticket.trip.vehicle.route.destination.name}`;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      title={
        <Text fw={700}>
          {mode === "confirm"
            ? "Xác nhận thanh toán tại quầy"
            : "Thông tin thanh toán"}
        </Text>
      }
    >
      <Stack gap="md">
        <Divider label="Thông tin khách hàng" labelPosition="center" />
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            Hành khách:
          </Text>
          <Text fw={500}>
            {ticket.user.firstName} {ticket.user.lastName}
          </Text>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            Số điện thoại:
          </Text>
          <Text fw={500}>{ticket.user.phoneNumber}</Text>
        </Group>

        <Divider label="Chi tiết chuyến đi" labelPosition="center" />
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            Tuyến đường:
          </Text>
          <Text size="sm" fw={500} ta="right">
            {routeName}
          </Text>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            Số ghế / Giờ đi:
          </Text>
          <Text size="sm" fw={500}>
            {ticket.seat.seatCode} | {format.formatDate(ticket.trip.departDate)}
          </Text>
        </Group>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-2">
          <Group justify="space-between">
            <Text fw={700} c="blue.9">
              Tổng tiền thu:
            </Text>
            <Text c="red.7" fw={800} size="xl">
              {/* Giả sử bạn có trường price, nếu không hãy thay bằng giá trị mặc định */}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(ticket.payment.amount || 0)}
            </Text>
          </Group>
        </div>

        {mode === "confirm" && (
          <Group justify="flex-end" mt="md">
            <Button variant="subtle" color="gray" onClick={onClose}>
              Hủy
            </Button>
            <Button
              color="green"
              onClick={() =>
                updateTicket({
                  ticketId: ticket.ticketId,
                  status: SearchTicketDTOStatusPaymentEnum.Paid,
                })
              }
              loading={isPendingUpdateTicket}
            >
              Xác nhận đã thu tiền
            </Button>
          </Group>
        )}
      </Stack>
    </Modal>
  );
};

export default PaymentModal;
