"use client";

import { TicketControllerGetMyTicketStatusEnum } from "@/apiGen/generated";
import NotFound from "@/component/NotFound";
import TicketItem from "@/component/TicketItem";
import { useTicket } from "@/hooks/useTicket";
import { RootState } from "@/redux/store";
import { Button, Center, Paper, Stack, Tabs, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";

interface MyOrderProps {}

const MyOrder: FunctionComponent<MyOrderProps> = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const { useFetchMyTicket } = useTicket();

  // State để track tab và status
  const [status, setStatus] = useState<TicketControllerGetMyTicketStatusEnum>(
    TicketControllerGetMyTicketStatusEnum.NotUsed
  );

  // Lấy dữ liệu theo status hiện tại
  const { data } = useFetchMyTicket({ status });
  const tickets = data?.data;

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
      <Text size="xl" fw={500} className="!mb-4">
        Đơn hàng của tôi
      </Text>

      <Tabs
        value={
          status === TicketControllerGetMyTicketStatusEnum.NotUsed
            ? "upcoming"
            : "used"
        }
        onChange={(value) => {
          if (value === "upcoming") {
            setStatus(TicketControllerGetMyTicketStatusEnum.NotUsed);
          } else {
            setStatus(TicketControllerGetMyTicketStatusEnum.Used);
          }
        }}
      >
        <Tabs.List className="mb-4">
          <Tabs.Tab value="upcoming">Lịch trình sắp tới</Tabs.Tab>
          <Tabs.Tab value="used">Vé đã đi</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="upcoming">
          {tickets && tickets.length > 0 ? (
            tickets.map((ticket: any) => (
              <div
                key={ticket.ticketId}
                className="mb-2 cursor-pointer"
                onClick={() =>
                  router.push(
                    `/chi-tiet-don-hang?ticketId=${ticket.ticketId}&phone=${user.phoneNumber}`
                  )
                }
              >
                <TicketItem ticket={ticket} />
              </div>
            ))
          ) : (
            <NotFound message="Bạn chưa có vé nào" />
          )}
        </Tabs.Panel>

        <Tabs.Panel value="used">
          {tickets?.map((ticket: any) => (
            <div
              key={ticket.ticketId}
              className="mb-2 cursor-pointer"
              onClick={() =>
                router.push(
                  `/chi-tiet-don-hang?ticketId=${ticket.ticketId}&phone=${user.phoneNumber}`
                )
              }
            >
              <TicketItem ticket={ticket} />
            </div>
          ))}
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default MyOrder;
