import { useTicket } from "@/hooks/useTicket";
import {
  Badge,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Modal,
  Stack,
  Text,
} from "@mantine/core";
import React from "react";

interface ModalDetailProps {
  isOpen: boolean;
  onClose: () => void;
  request: any;
}

const ModalDetail: React.FC<ModalDetailProps> = ({
  isOpen,
  onClose,
  request,
}) => {
  const { requestedBy, accountHolderName, bankName, accountNumber, status } =
    request;
  const { firstName, lastName, email, phoneNumber } = requestedBy;
  const { ticketId } = request.ticket;
  const { useSearchTicket, useDeleteTicket } = useTicket();
  const { data: ticketResponse, isLoading: isLoadingTicket } = useSearchTicket({
    ticketId,
  });
  const { mutate: deleteTicket } = useDeleteTicket();

  const handleClickConfirmRefund = async () => {
    const isConfirmed = window.confirm(`❓ Xác nhận hoàn tiền`);

    if (!isConfirmed) return;

    try {
      deleteTicket(ticketId, {
        onSuccess: () => {
          alert("✅ Hoàn tiền thành công!");
          onClose();
        },
      });
    } catch (error: any) {
      alert(error.message);
    }
  };

  if (!isOpen) return null;

  if (isLoadingTicket) return;
  const ticket = ticketResponse.data[0];
  const isReturn = ticket?.trip?.type === "return";

  const origin = isReturn
    ? ticket?.trip?.vehicle?.route?.destination?.name
    : ticket?.trip?.vehicle?.route?.origin?.name;

  const destination = isReturn
    ? ticket?.trip?.vehicle?.route?.origin?.name
    : ticket?.trip?.vehicle?.route?.destination?.name;

  return (
    <Modal
      opened
      onClose={onClose}
      title={
        <Group justify="space-between">
          <Text fw={700} size="lg">
            Chi tiết giao dịch
          </Text>
          <Badge
            radius="xl"
            color={
              status === "PENDING"
                ? "yellow"
                : status === "COMPLETE"
                ? "green"
                : "red"
            }
          >
            {status}
          </Badge>
        </Group>
      }
      size="lg"
      radius="lg"
      centered
    >
      <Stack gap="md">
        {/* Thông tin người dùng */}
        <Card withBorder radius="md" padding="md">
          <Text fw={600} mb={6}>
            Thông tin người dùng
          </Text>
          <Grid>
            <Grid.Col span={6}>
              <Text size="sm">
                <b>Họ tên:</b> {firstName} {lastName}
              </Text>
              <Text size="sm">
                <b>Email:</b> {email}
              </Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="sm">
                <b>SĐT:</b> {phoneNumber}
              </Text>
            </Grid.Col>
          </Grid>
        </Card>

        {/* Thông tin tài khoản ngân hàng */}
        <Card withBorder radius="md" padding="md">
          <Text fw={600} mb={6}>
            Thông tin tài khoản ngân hàng
          </Text>
          <Grid>
            <Grid.Col span={6}>
              <Text size="sm">
                <b>Ngân hàng:</b> {bankName}
              </Text>
              <Text size="sm">
                <b>Chủ TK:</b> {accountHolderName}
              </Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="sm">
                <b>Số TK:</b> {accountNumber}
              </Text>
            </Grid.Col>
          </Grid>
        </Card>

        {/* Thông tin vé */}
        <Card withBorder radius="md" padding="md">
          <Text fw={600} mb={6}>
            Thông tin vé
          </Text>
          <Grid>
            <Grid.Col span={6}>
              <Text size="sm">
                <b>Mã vé:</b> {ticket?.ticketId}
              </Text>
              <Text size="sm">
                <b>Ghế:</b> {ticket?.seat?.seatCode}
              </Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="sm">
                <b>Chuyến đi:</b> {origin} → {destination}
              </Text>
              <Text size="sm">
                <b>Giờ khởi hành:</b>{" "}
                {new Date(ticket?.trip?.departDate).toLocaleString("vi-VN")}
              </Text>
            </Grid.Col>
          </Grid>
        </Card>

        <Divider />

        {/* Footer */}
        <Group justify="flex-end">
          <Button variant="default" onClick={onClose}>
            Đóng
          </Button>

          {status === "PENDING" && (
            <Button color="red" onClick={handleClickConfirmRefund}>
              Xác nhận đã hoàn tiền
            </Button>
          )}
        </Group>
      </Stack>
    </Modal>
  );
};

export default ModalDetail;
