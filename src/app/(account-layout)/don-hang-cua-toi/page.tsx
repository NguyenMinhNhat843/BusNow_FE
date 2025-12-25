"use client";

import { useTicket } from "@/hooks/useTicket";
import { RootState } from "@/redux/store";
import {
  Badge,
  Button,
  Card,
  Center,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";

interface MyOrderProps {}

const MyOrder: FunctionComponent<MyOrderProps> = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const { useFetchMyTicket } = useTicket();
  const { data: ticketsResponse } = useFetchMyTicket();
  const tickets = ticketsResponse?.data;
  if (!user) {
    return (
      <Center h="100%">
        <Paper p="xl" w={400}>
          <Stack align="center" gap="md">
            <Text fw={600} size="lg">
              Bạn chưa đăng nhập
            </Text>

            <Text size="sm" c="dimmed" ta="center">
              Đăng nhập để xem lịch sử vé trong 3 tháng gần nhất
            </Text>

            <Button
              fullWidth
              radius="md"
              color="yellow"
              onClick={() => router.push("/dang-nhap")}
            >
              Đăng nhập
            </Button>
          </Stack>
        </Paper>
      </Center>
    );
  }

  return (
    <div>
      {tickets?.tickets.map((ticket: any) => {
        const isPaid = ticket.status !== "UNPAID";

        return (
          <Card
            key={ticket.ticketId}
            shadow="sm"
            radius="lg"
            p="md"
            mb="md"
            withBorder
            className="w-96 m-4  transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md cursor-pointer"
          >
            <Stack gap="xs">
              {/* Header: ngày + trạng thái */}
              <Group justify="space-between">
                <Text size="sm" c="dimmed">
                  {ticket.departDate}
                </Text>

                <Badge color={isPaid ? "green" : "yellow"} variant="light">
                  {isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                </Badge>
              </Group>

              <Divider />

              {/* Tuyến đi */}
              <Text fw={600} size="lg">
                {ticket.origin} → {ticket.destination}
              </Text>

              {/* Thông tin xe */}
              <Group justify="space-between">
                <Text size="sm">
                  Nhà xe:{" "}
                  <Text span fw={500}>
                    {ticket.providerName}
                  </Text>
                </Text>

                <Text size="sm">
                  Biển số xe:{" "}
                  <Text fw={500} span>
                    {ticket.vehicleCode}
                  </Text>
                </Text>
                <Button>Hủy vé</Button>
              </Group>
            </Stack>
          </Card>
        );
      })}
    </div>
  );
};

export default MyOrder;
