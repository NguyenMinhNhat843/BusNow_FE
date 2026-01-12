"use client";

import { TicketControllerGetMyTicketStatusEnum } from "@/apiGen/generated";
import NotFound from "@/component/NotFound";
import TicketItem from "@/component/TicketItem";
import { useTicket } from "@/hooks/useTicket";
import { RootState } from "@/redux/store";
import {
  Button,
  Center,
  LoadingOverlay,
  Pagination,
  Paper,
  Stack,
  Tabs,
  Text,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";

interface MyOrderProps {}

const MyOrder: FunctionComponent<MyOrderProps> = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const { useFetchMyTicket } = useTicket();
  const [page, setPage] = useState(1);
  const limitPerPage = 5;

  // State để track tab và status
  const [status, setStatus] = useState<TicketControllerGetMyTicketStatusEnum>(
    TicketControllerGetMyTicketStatusEnum.NotUsed
  );

  // Lấy dữ liệu theo status hiện tại
  const { data, isLoading } = useFetchMyTicket({
    status,
    page,
    limit: limitPerPage,
  });
  const tickets = data?.data;
  const total = data?.total;

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

  const ticketList = (
    <div className="relative">
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      {!isLoading && tickets && tickets.length > 0 ? (
        <>
          {tickets?.map((ticket: any) => (
            <TicketItem
              key={ticket.ticketId}
              ticket={ticket}
              className="mb-4"
              onClick={() =>
                router.push(
                  `/chi-tiet-don-hang?ticketId=${ticket.ticketId}&phone=${user.phoneNumber}`
                )
              }
            />
          ))}
          <Pagination
            value={page}
            total={Math.ceil(total / limitPerPage)}
            onChange={setPage}
            className="mt-4 flex justify-center"
          />
        </>
      ) : (
        <NotFound message="Bạn chưa có vé nào" />
      )}
    </div>
  );

  return (
    <div>
      <Text size="xl" fw={500} className="!mb-4">
        Đơn hàng của tôi
      </Text>

      <Tabs
        value={status}
        onChange={(value) => {
          if (value === TicketControllerGetMyTicketStatusEnum.NotUsed) {
            setStatus(TicketControllerGetMyTicketStatusEnum.NotUsed);
          } else {
            setStatus(TicketControllerGetMyTicketStatusEnum.Used);
          }
        }}
      >
        <Tabs.List className="mb-4">
          <Tabs.Tab value={TicketControllerGetMyTicketStatusEnum.NotUsed}>
            Lịch trình sắp tới
          </Tabs.Tab>
          <Tabs.Tab value={TicketControllerGetMyTicketStatusEnum.Used}>
            Vé đã đi
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={TicketControllerGetMyTicketStatusEnum.NotUsed}>
          {ticketList}
        </Tabs.Panel>

        <Tabs.Panel value={TicketControllerGetMyTicketStatusEnum.Used}>
          {ticketList}
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default MyOrder;
