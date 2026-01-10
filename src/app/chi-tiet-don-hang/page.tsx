"use client";

import { useTicket } from "@/hooks/useTicket";
import {
  Badge,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { FunctionComponent, useState } from "react";
import BankingInfoModal from "./components/BankingInfoSection";
import format from "@/utils/format";

interface ChiTietDonHangProps {}

const ChiTietDonHang: FunctionComponent<ChiTietDonHangProps> = () => {
  const searchParams = useSearchParams();
  const ticketId = searchParams.get("ticketId");
  const router = useRouter();

  const [bankingModalOpened, setBankingModalOpened] = useState(false);
  const { useSearchTicket, useCancleTicket } = useTicket();
  const { data: ticketResponse } = useSearchTicket({
    ticketId: String(ticketId),
  });
  const ticket = ticketResponse?.data[0];
  const isPaid = ticket?.status === "PAID";

  const { mutate: cancleTicket } = useCancleTicket();

  if (!ticketId) return;

  const handleCancleTicket = async () => {
    if (!isPaid) {
      cancleTicket(
        {
          ticketId,
        },
        {
          onSuccess: () => {
            alert("Hủy vé thành công");
            router.push("/don-hang-cua-toi");
          },
          onError: (err: any) => {
            alert("Lỗi: " + err.message);
          },
        }
      );
    } else {
      setBankingModalOpened(true);
    }
  };

  const route =
    ticket?.trip?.type === "return"
      ? `${ticket?.trip?.vehicle?.route?.origin?.name} → ${ticket?.trip?.vehicle?.route?.destination?.name}`
      : `${ticket?.trip?.vehicle?.route?.destination?.name} ← ${ticket?.trip?.vehicle?.route?.origin?.name}`;

  return (
    <Grid gutter="lg" className="max-w-5xl mx-auto mt-6">
      {/* ===== CỘT TRÁI: THÔNG TIN XE ===== */}
      <Grid.Col span={{ base: 12, md: 8 }}>
        <Card withBorder radius="md" padding="lg">
          <Group justify="space-between" mb="sm">
            <Text size="xl" fw={600}>
              Xe {ticket?.trip?.vehicle?.provider?.lastName}
            </Text>
            <Badge color="blue" variant="light">
              {ticket?.trip?.vehicle?.busType}
            </Badge>
          </Group>

          <Divider mb="md" />

          <SimpleGrid cols={2} spacing="md">
            {[
              {
                label: "Tuyến đường",
                value: route,
              },
              {
                label: "Ngày khởi hành",
                value: format.formatDate(ticket?.trip?.departDate),
              },
              {
                label: "Biển số xe",
                value: ticket?.trip?.vehicle?.code,
              },
              {
                label: "Ghế",
                value: ticket?.seat?.seatCode,
              },
            ].map((item) => (
              <Stack key={item.label} gap={4}>
                <Text size="sm" c="dimmed">
                  {item.label}
                </Text>
                <Text fw={500}>{item.value}</Text>
              </Stack>
            ))}
          </SimpleGrid>

          {!ticket?.used && (
            <div className="flex justify-center" onClick={handleCancleTicket}>
              <Button className="!bg-red-500 !w-full mt-4">Hủy vé</Button>
            </div>
          )}
        </Card>
      </Grid.Col>

      <BankingInfoModal
        opened={bankingModalOpened}
        onClose={() => setBankingModalOpened(false)}
        ticketId={ticketId}
      />

      {/* ===== CỘT PHẢI ===== */}
      <Grid.Col span={{ base: 12, md: 4 }}>
        <Stack gap="lg">
          {/* --- THANH TOÁN --- */}
          <Card withBorder radius="md" padding="lg">
            <Text fw={600} size="lg" mb="sm">
              Thanh toán
            </Text>

            <Divider mb="md" />

            <Stack gap="sm">
              <Group justify="space-between">
                <Text c="dimmed">Trạng thái</Text>
                <Badge color="green" variant="filled">
                  {ticket?.status}
                </Badge>
              </Group>

              <Group justify="space-between">
                <Text c="dimmed">Phương thức</Text>
                <Text fw={500}>{ticket?.payment?.method}</Text>
              </Group>

              <Group justify="space-between">
                <Text c="dimmed">Tổng tiền</Text>
                <Text fw={700} size="lg" c="blue">
                  {ticket?.payment?.amount?.toLocaleString()} đ
                </Text>
              </Group>
            </Stack>
          </Card>

          {/* --- HỖ TRỢ --- */}
          <Card withBorder radius="md" padding="lg">
            <Text fw={600} size="lg" mb="sm">
              Trung tâm hỗ trợ
            </Text>

            <Divider mb="md" />

            <Stack gap={6}>
              <Text>📞 0123 456 789</Text>
              <Text>📧 hotro@gmail.com</Text>
            </Stack>
          </Card>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default ChiTietDonHang;
