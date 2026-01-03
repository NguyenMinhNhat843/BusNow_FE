"use client";

import TicketItem from "@/component/TicketItem";
import { useTicket } from "@/hooks/useTicket";
import { RootState } from "@/redux/store";
import { Button, Center, Paper, Stack, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";

interface MyOrderProps {}

const MyOrder: FunctionComponent<MyOrderProps> = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const { useFetchMyTicket } = useTicket();
  const { data: tickets } = useFetchMyTicket();
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
      {tickets?.map((ticket: any) => {
        return (
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
        );
      })}
    </div>
  );
};

export default MyOrder;
