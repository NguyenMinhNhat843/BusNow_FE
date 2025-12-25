"use client";

import { ticketApi } from "@/api/ticketApi";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  requestFilterTicketApi,
  Ticket,
  ResponseFilterTicketApi,
} from "../../../api/DTO/ticketApiDto";
import { ticketStatusEnum } from "@/api/Enum/ticketStatusEnum";
import { SortTicketEnum } from "@/api/Enum/sortTicketEnum";

export default function QuanLyDonHang() {
  const numberPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [tickets, setTickets] = useState<Ticket[] | null>(null);
  const [totalResult, setTotalResult] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filterData, setFilterData] = useState<requestFilterTicketApi>({
    numberPerPage,
    page: currentPage,
    userId: "", // optional
    time: {
      // optional
      startTime: "",
      endTime: "",
    },
    ticketStatus: "", // optional
    sortBy: "", // optional
  });

  const fetchTickets = async (dât: requestFilterTicketApi = filterData) => {
    setIsLoading(true);
    try {
      const response: ResponseFilterTicketApi = await ticketApi.filterTickets(
        filterData
      );
      if (response.status === "success") {
        setTickets(response.tickets);
        setTotalResult(response.pagination.total);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra!!!");
    } finally {
      setIsLoading(false);
    }
  };

  // fetch lần đầu
  // useEffect(() => {
  //   fetchTickets();
  // }, []);

  // fetch khi filterData có thay đổi
  useEffect(() => {
    fetchTickets();
  }, [filterData]);

  // const handleChangeUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   const newFilterData = {
  //     ...filterData,
  //     userId: value,
  //   };
  //   setFilterData(newFilterData);
  // };

  const handleOnChangeTicketStatus = (e: any) => {
    const value = e.target.value;
    const newFilterData = {
      ...filterData,
      ticketStatus: value,
    };
    setFilterData(newFilterData);
  };

  const handleOnChangeSort = (e: any) => {
    const value = e.target.value;
    const newFilterData = {
      ...filterData,
      sortBy: value,
    };
    setFilterData(newFilterData);
  };

  const handleOnChangeRangeTime = (e: any) => {
    const { name, value } = e.target;
    const newFilterData = {
      ...filterData,
      time: {
        ...filterData.time,
        [name]: value,
      },
    };
    setFilterData(newFilterData);
  };

  return (
    <div>
      {/* filter compoennt */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Nhập User ID"
          className="border border-gray-300 rounded px-3 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-400"
          // value={filterData.userId}
          // onChange={(e) => handleChangeUserId(e)}
        />

        <input
          type="date"
          lang="vi"
          className="border border-gray-300 rounded px-3 py-2 w-56 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={filterData.time?.startTime}
          onChange={(e) => handleOnChangeRangeTime(e)}
          name="startTime"
        />

        <input
          type="date"
          lang="vi"
          className="border border-gray-300 rounded px-3 py-2 w-56 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={filterData.time?.endTime}
          onChange={(e) => handleOnChangeRangeTime(e)}
          name="endTime"
        />

        <select
          className="border border-gray-300 rounded px-3 py-2 w-44 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={filterData.ticketStatus}
          onChange={(e) => handleOnChangeTicketStatus(e)}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="PAID">PAID</option>
          <option value="UNPAID">UNPAID</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>

        <select
          className="border border-gray-300 rounded px-3 py-2 w-44 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={filterData.sortBy}
          onChange={(e) => handleOnChangeSort(e)}
        >
          <option value="">Mặc định</option>
          <option value="TIME_ASC">Thời gian đặt ↑</option>
          <option value="TIME_DESC">Thời gian đặt ↓</option>
        </select>
      </div>

      {/* danh sách tickets */}
      <p>{totalResult} vé</p>
      {tickets &&
        tickets.length > 0 &&
        tickets.map((ticket) => (
          <div
            key={ticket.ticketId}
            className="border border-gray-300 p-4 rounded-lg mb-4 shadow-sm bg-white"
          >
            <p className="text-sm">
              <span className="font-semibold">Khách hàng:</span>{" "}
              {ticket.user.lastName} {ticket.user.firstName}
            </p>
            <p className="text-sm">
              <span className="font-semibold">SĐT:</span>{" "}
              {ticket.user.phoneNumber}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Tuyến đường:</span>{" "}
              {ticket.departLocation.name} → {ticket.arrivalLocation.name}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Mã ghế:</span> {ticket.seatCode}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Thời gian khởi hành:</span>{" "}
              {new Date(ticket.trip.departTime).toLocaleString()}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Giá vé:</span>{" "}
              {ticket.trip.price.toLocaleString()} VND
            </p>
            <p className="text-sm">
              <span className="font-semibold">Đặt vé lúc:</span>{" "}
              {new Date(ticket.payment.paymentTime).toLocaleString()}
            </p>
            <p
              className={`text-sm font-semibold ${
                ticket.payment.status === "SUCCESS"
                  ? "text-green-600"
                  : ticket.payment.status === "FAILED"
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}
            >
              Trạng thái: {ticket.status}
            </p>
          </div>
        ))}
    </div>
  );
}
