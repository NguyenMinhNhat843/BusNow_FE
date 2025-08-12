import { ticketApi } from "@/api/ticketApi";
import React, { useEffect, useState } from "react";

interface Seat {
  seatNumber: string;
}

interface Trip {
  from: string;
  to: string;
  departureTime: string;
}

interface Ticket {
  code: string;
  seat: Seat;
  trip: Trip;
}

interface ModalDetailProps {
  isOpen: boolean;
  onClose: () => void;
  user: any | null;
  bank: any | null;
  ticketId: string;
  requestId: string;
}

const ModalDetail: React.FC<ModalDetailProps> = ({
  isOpen,
  onClose,
  user,
  bank,
  ticketId,
  requestId,
}) => {
  const [ticket, setTicket] = useState<any>(null);
  // Load thông tin vé
  useEffect(() => {
    // Fetch ticket information here
    const fetchTicketInfoById = async () => {
      try {
        const result = await ticketApi.getTicketById(ticketId);
        if (result.status === "success") {
          setTicket(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTicketInfoById();
  }, []);

  const handleClickConfirmRefund = async () => {
    try {
      await ticketApi.confirmRefund(requestId);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl shadow-lg p-6">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold">Chi tiết giao dịch</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Thông tin User */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2">Thông tin người dùng</h3>
          <div className="space-y-1 text-sm">
            <p>
              <strong>Họ tên:</strong> {user.firstName + " " + user.lastName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>SĐT:</strong> {user.phoneNumber}
            </p>
          </div>
        </div>

        {/* Thông tin tài khoản ngân hàng */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2">
            Thông tin tài khoản ngân hàng
          </h3>
          <div className="space-y-1 text-sm">
            <p>
              <strong>Ngân hàng:</strong> {bank.bankName}
            </p>
            <p>
              <strong>Số tài khoản:</strong> {bank.accountNumber}
            </p>
            <p>
              <strong>Chủ tài khoản:</strong> {bank.accountHolderName}
            </p>
          </div>
        </div>

        {/* Thông tin vé */}
        {ticket && (
          <div className="mb-4">
            <h3 className="font-semibold text-lg mb-2">Thông tin vé</h3>
            <div className="space-y-1 text-sm">
              <p>
                <strong>Mã vé:</strong> {ticket.ticketId}
              </p>
              <p>
                <strong>Ghế:</strong> {ticket.seat.seatCode}
              </p>
              <p>
                <strong>Chuyến đi:</strong>{" "}
                {ticket.trip.vehicle.route.origin.name} →{" "}
                {ticket.trip.vehicle.route.destination.name}
              </p>
              <p>
                <strong>Giờ khởi hành:</strong>{" "}
                {new Date(ticket.trip.departDate).toLocaleString("vi-VN")}
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end border-t pt-3">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded"
          >
            Đóng
          </button>
          <button
            onClick={handleClickConfirmRefund}
            className="bg-red-400 hover:bg-red-600 text-sm px-4 ms-4 py-2 rounded text-black/80"
          >
            Xác nhận đã hoàn tiền
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDetail;
