"use client";

import { ticketApi } from "@/api/ticketApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import TicketItem from "../tra-cuu-don-hang/components/TicketItem";
import CancelTicketModal from "../tra-cuu-don-hang/components/CancelTicketModal";

export default function DonHangCuaToiPage() {
  const [phone, setPhone] = useState("0123456789");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [userInfo, setUserInfo] = useState<any>();
  const [error, setError] = useState("");
  const [openModalCancelled, setOpenModalCancelled] = useState<boolean>(false);

  useEffect(() => {
    const fetchMyTickets = async () => {
      try {
        setLoading(true);
        const response = await ticketApi.getMyTickets();
        if (response.status === "success") {
          setOrders(response.data.tickets);
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

      {/* Modal nhập tài khoản để hoàn tiền */}
      {openModalCancelled && (
        <CancelTicketModal
          onClose={() => setOpenModalCancelled(false)}
          onSubmit={() => {}}
        />
      )}

      {loading ? (
        <p className="text-gray-500">Đang tải đơn hàng...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">Bạn chưa có đơn hàng nào.</p>
      ) : (
        <div className="grid gap-4">
          {orders
            .filter((order: any) => order.status !== "CANCELLED")
            .map((order: any, idx) => (
              <div key={idx}>
                <TicketItem
                  ticket={order}
                  openModalCancelled={openModalCancelled}
                  setOpenModalCancelled={setOpenModalCancelled}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
