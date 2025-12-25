"use client";

import { useTicket } from "@/hooks/useTicket";
import { Button, Input } from "@mantine/core";
import { FunctionComponent, useState } from "react";
import ListTicket from "./components/ListTicket";

interface QuanLyVeProps {}

const QuanLyVe: FunctionComponent<QuanLyVeProps> = () => {
  const [phone, setPhone] = useState("");
  const { useFetchTicketByPhone } = useTicket();
  const { mutate: fetchTicketByPhone, data: tickets = [] } =
    useFetchTicketByPhone();

  return (
    <div className="m-4">
      <form
        className="flex justify-between items-center"
        onSubmit={(e) => {
          e.preventDefault(); // tránh reload page
          fetchTicketByPhone(
            { phone },
            {
              onError: () => alert("Có lỗi khi lấy ticket"),
            }
          );
        }}
      >
        <Input
          placeholder="Nhập số điện thoại"
          className="grow"
          value={phone}
          onChange={(e) => setPhone(e.currentTarget.value)}
        />

        <Button type="submit" w={100} className="ms-4">
          Tìm
        </Button>
      </form>
      <div className="mt-4">
        <ListTicket tickets={tickets} />
      </div>
    </div>
  );
};

export default QuanLyVe;
