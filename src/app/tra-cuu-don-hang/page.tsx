"use client";

import { BusTypeEnum } from "@/api/Enum/BusTypeEnum";
import { ticketApi } from "@/api/ticketApi";
import { useEffect, useState } from "react";
import TicketItem from "./components/TicketItem";
import CancelTicketModal from "./components/CancelTicketModal";

export default function OrderLookup() {
  const [phone, setPhone] = useState("0123456789");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [userInfo, setUserInfo] = useState<any>();
  const [error, setError] = useState("");
  const [openModalCancelled, setOpenModalCancelled] = useState<boolean>(false);

  const handleSearch = async () => {
    // Kiểm tra: 10 số và bắt đầu bằng 0
    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(phone)) {
      setError(
        "Số điện thoại không hợp lệ. Vui lòng nhập 10 số và bắt đầu bằng 0."
      );
      setOrders([]);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await ticketApi.findTicketByPhone(phone);
      if (res.status === "success") {
        setOrders(res.data.tickets);
        setUserInfo(res.data.user);
      }
    } catch (err: any) {
      setError(err.message || "Lỗi hệ thống");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto mt-10 p-4">
      {/* Nhập số điện thoại */}
      <div className="flex justify-center">
        <div className="flex gap-2">
          <input
            placeholder="Nhập số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-slate-700 rounded-md p-2"
          />
          <button
            className="bg-yellow-400 hover:bg-yellow-500 transition-all cursor-pointer px-4 rounded-md"
            onClick={handleSearch}
            disabled={loading || !phone}
          >
            {loading ? (
              <span className="animate-spin w-4 h-4">⏳</span>
            ) : (
              "Tra cứu"
            )}
          </button>
        </div>
      </div>

      {/* Modal nhập tài khoản để haonf tiền */}
      {openModalCancelled && (
        <CancelTicketModal
          onClose={() => setOpenModalCancelled(false)}
          onSubmit={() => {}}
        />
      )}

      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

      {orders && orders.length > 0 && (
        <div className="mt-6 space-y-6">
          {/* Thông tin hành khách */}
          <div className="p-4 rounded-md border border-slate-200 bg-gray-50">
            <p>
              <strong>Họ tên:</strong> {userInfo.fullName}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {userInfo.phoneNumber}
            </p>
            <p>
              <strong>Email:</strong> {userInfo.email}
            </p>
          </div>

          {/* Danh sách vé */}
          <div className="grid grid-cols-2 gap-4">
            {orders.map((order, idx) => (
              <div key={idx}>
                <TicketItem
                  ticket={order}
                  openModalCancelled={openModalCancelled}
                  setOpenModalCancelled={setOpenModalCancelled}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
