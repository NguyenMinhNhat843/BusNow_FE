"use client";

import { ticketApi } from "@/api/ticketApi";
import { useState } from "react";

export default function OrderLookup() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [error, setError] = useState("");

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
      setOrders(res);
    } catch (err: any) {
      setError(err.message || "Lỗi hệ thống");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4">Tra cứu đơn hàng</h2>
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
          {loading ? <p className="animate-spin w-4 h-4"></p> : "Tra cứu"}
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="mt-6 space-y-6">
        {orders.map((order, idx) => (
          <div
            key={idx}
            className="p-6 border border-gray-200 rounded-2xl shadow-md bg-white"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Cột 1: Thông tin hành khách */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  Thông tin khách
                </h3>
                <p>
                  <strong>Họ tên:</strong> {order.fullName}
                </p>
                <p>
                  <strong>Số điện thoại:</strong> {order.phoneNumber}
                </p>
                <p>
                  <strong>Email:</strong> {order.email}
                </p>
                <p>
                  <strong>Ghế:</strong> {order.seatCode}
                </p>
                <p>
                  <strong>Giá vé:</strong> {order.price.toLocaleString()}₫
                </p>
              </div>

              {/* Cột 2: Thông tin chuyến đi & thanh toán */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  Thông tin chuyến đi
                </h3>
                <p>
                  <strong>Tuyến:</strong> {order.origin} → {order.destination}
                </p>
                <p>
                  <strong>Biển số xe:</strong> {order.vehicleCode} (
                  {order.vehicleType})
                </p>
                <p>
                  <strong>Giờ khởi hành:</strong>{" "}
                  {new Date(order.departDate).toLocaleString()}
                </p>
                <p>
                  <strong>Phương thức thanh toán:</strong> {order.paymentMethod}
                </p>
                <p>
                  <strong>Trạng thái thanh toán:</strong> {order.paymentStatus}
                </p>
                <p>
                  <strong>Trạng thái chuyến:</strong> {order.tripStatus}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
