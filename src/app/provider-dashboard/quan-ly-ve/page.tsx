"use client";

import { useTicket } from "@/hooks/useTicket";
import {
  Badge,
  Button,
  Loader,
  Select,
  Table,
  TableData,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import {
  SearchTicketDTO,
  SearchTicketDTOStatusPaymentEnum,
} from "@/apiGen/generated";
import { useForm } from "@mantine/form";
import format from "@/utils/format";
import { RoleEnum } from "@/api/Enum/RoleEnum";
import { useAuthContext } from "@/app/AuthContext";
import { useDisclosure } from "@mantine/hooks";
import PaymentModal from "./components/PaymentModal";

const QuanLyVe = () => {
  const { user: profile } = useAuthContext();
  const { useSearchTicket } = useTicket();
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  const [payload, setPayload] = useState<SearchTicketDTO | null>(null);

  const form = useForm<SearchTicketDTO>({
    initialValues: {
      page: 1,
      limit: 10,
      providerId:
        profile?.role === RoleEnum.PROVIDER ? profile?.userId : undefined,
    },
  });

  useEffect(() => {
    if (profile) {
      const pId =
        profile.role === RoleEnum.PROVIDER ? profile.userId : undefined;

      const initialPayload = {
        page: 1,
        limit: 10,
        providerId: pId,
      };

      form.setValues(initialPayload);
      setPayload(initialPayload);
    }
  }, [profile]); // Chạy khi profile từ null -> có data

  const { data, isLoading } = useSearchTicket(payload as SearchTicketDTO);

  const handleRowClick = (ticket: any) => {
    if (ticket.status === "UNPAID") {
      setSelectedTicket(ticket);
      open();
    }
  };

  const dataTicketTable: TableData = {
    head: [
      "Trạng thái",
      "Hành khách",
      "Số điện thoại",
      "Biển số xe",
      "Tuyến đường",
      "Giờ xuất phát",
      "Nhà xe",
      "Ghế",
    ],
    body: data?.data?.map((ticket: any) => {
      const routeDisplayName =
        ticket.trip.vehicle.route.origin.name +
        " - " +
        ticket.trip.vehicle.route.destination.name;

      const statusBadge =
        ticket.status === "UNPAID" ? (
          <Badge
            color="red"
            variant="light"
            style={{ cursor: "pointer" }}
            onClick={() => handleRowClick(ticket)}
          >
            Chờ thanh toán (Bấm để xác nhận)
          </Badge>
        ) : (
          <Badge color="green">{ticket.status}</Badge>
        );
      return [
        statusBadge,
        `${ticket.user.firstName} ${ticket.user.lastName}`,
        ticket.user.phoneNumber,
        ticket.trip.vehicle.code,
        routeDisplayName,
        format.formatDate(ticket.trip.departDate),
        ticket.trip.vehicle.provider.lastName,
        ticket.seat.seatCode,
      ];
    }),
  };

  const handleSubmit = (values: SearchTicketDTO) => {
    setPayload({
      ...values,
      page: 1,
    });
  };

  return (
    <div className="m-4">
      {/* Cấu trúc Modal */}
      <PaymentModal onClose={close} opened={opened} ticket={selectedTicket} />

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <TextInput
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            {...form.getInputProps("phone")}
          />

          <TextInput
            label="Mã xe"
            placeholder="VD: XE123"
            {...form.getInputProps("vehicleCode")}
          />

          <TextInput
            label="Trip ID"
            placeholder="Nhập tripId"
            {...form.getInputProps("tripId")}
          />

          <Select
            label="Trạng thái thanh toán"
            placeholder="Tất cả"
            clearable
            data={[
              {
                value: SearchTicketDTOStatusPaymentEnum.Paid,
                label: "Đã thanh toán",
              },
              {
                value: SearchTicketDTOStatusPaymentEnum.Unpaid,
                label: "Chưa thanh toán",
              },
              {
                value: SearchTicketDTOStatusPaymentEnum.Cancelled,
                label: "Đã hủy",
              },
            ]}
            {...form.getInputProps("statusPayment")}
          />
          <div className="flex items-end">
            <Button type="submit" loading={isLoading} className="grow">
              Tìm kiếm
            </Button>
          </div>
        </div>
      </form>

      <div className="mt-6">
        {isLoading ? (
          <div className="flex justify-center items-center mt-20">
            <Loader size={30} />
          </div>
        ) : (
          <Table data={dataTicketTable} />
        )}
      </div>
    </div>
  );
};

export default QuanLyVe;
