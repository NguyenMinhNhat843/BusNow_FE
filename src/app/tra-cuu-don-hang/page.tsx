"use client";

import { ticketApi } from "@/api/ticketApi";
import { useEffect, useState } from "react";
import TicketItem from "./components/TicketItem";
import CancelTicketModal from "./components/CancelTicketModal";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "sonner";

export default function OrderLookup() {
  console.log("abc");
  // Kiểm tra có đang đăng nhập không?
  const user = useSelector((state: RootState) => state.auth.user);

  // state
  const [phone, setPhone] = useState("0123456789");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [userInfo, setUserInfo] = useState<any>();
  const [error, setError] = useState("");
  const [openModalCancelled, setOpenModalCancelled] = useState<boolean>(false);
  const [ticketIdCancelled, setTicketIdCancelled] = useState<string>("");
  const [isLogging, setIsLogging] = useState<boolean>(false);

  // use effect
  useEffect(() => {
    // Nếu đang logging thì hiện ticket ra luôn
    if (user) {
      setIsLogging(true);
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
    }
  }, [user]);

  // method
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
      {!isLogging && (
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
      )}

      {/* Modal nhập tài khoản để hoàn tiền */}
      {openModalCancelled && (
        <CancelTicketModal
          onClose={() => setOpenModalCancelled(false)}
          onSubmit={() => {}}
          body={{ ticketId: ticketIdCancelled }}
        />
      )}

      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

      {orders && orders.length > 0 && (
        <div className="mt-6 space-y-6">
          {/* Nếu chưa logging khi tìm đơn hàng phải có thông tin người dùng */}
          {!isLogging && (
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
          )}
          <p className="text-3xl font-bold">Đơn hàng của tôi</p>
          {/* Danh sách vé */}
          <div className="grid grid-cols-2 gap-4">
            {orders.map((order, idx) => (
              <div key={idx}>
                <TicketItem
                  ticket={order}
                  setOpenModalCancelled={setOpenModalCancelled}
                  setTicketIdCancelled={setTicketIdCancelled}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
