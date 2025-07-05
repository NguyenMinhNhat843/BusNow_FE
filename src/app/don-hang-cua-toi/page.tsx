"use client";

import { ticketApi } from "@/api/ticketApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function DonHangCuaToiPage() {
  const [myTickets, setMyTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyTickets = async () => {
      try {
        const response = await ticketApi.getMyTickets();
        if (response.status === "success") {
          setMyTickets(response.data || []);
        } else {
          toast.error("Không tìm thấy đơn hàng của bạn.");
        }
      } catch (error) {
        toast.error("Lỗi khi tải đơn hàng của bạn. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyTickets();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Đơn hàng của tôi</h1>

      {loading ? (
        <p className="text-gray-500">Đang tải đơn hàng...</p>
      ) : myTickets.length === 0 ? (
        <p className="text-gray-500">Bạn chưa có đơn hàng nào.</p>
      ) : (
        <div className="grid gap-4">
          {myTickets.map((ticket: any) => (
            <div
              key={ticket.ticketId}
              className="border border-gray-300 rounded-md p-4 shadow-sm"
            >
              <p>
                <strong>Mã vé:</strong> {ticket.ticketId}
              </p>
              <p>
                <strong>Chuyến đi:</strong> {ticket.trip.fromLocationName} →{" "}
                {ticket.trip.toLocationName}
              </p>
              <p>
                <strong>Thời gian:</strong> {ticket.trip.departTime}
              </p>
              <p>
                <strong>Ghế:</strong> {ticket.seat.seatCode}
              </p>
              <p>
                <strong>Trạng thái thanh toán:</strong> {ticket.status}
              </p>
              <p>
                <strong>Phương thức thanh toán:</strong> {ticket.payment.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
