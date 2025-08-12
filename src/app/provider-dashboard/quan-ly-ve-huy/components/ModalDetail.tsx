import React from "react";

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
  refundInfo: any | null;
  user: any | null;
  bank: any | null;
  //   ticket: Ticket | null;
}

const ModalDetail: React.FC<ModalDetailProps> = ({
  isOpen,
  onClose,
  user,
  bank,
  //   ticket,
}) => {
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
              <strong>Họ tên:</strong> {user.lastName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>SĐT:</strong> {user.phone}
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
              <strong>Chủ tài khoản:</strong> {bank.accountHolder}
            </p>
          </div>
        </div>

        {/* Thông tin vé */}
        {/* <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2">Thông tin vé</h3>
          <div className="space-y-1 text-sm">
            <p>
              <strong>Mã vé:</strong> {ticket.code}
            </p>
            <p>
              <strong>Ghế:</strong> {ticket.seat.seatNumber}
            </p>
            <p>
              <strong>Chuyến đi:</strong> {ticket.trip.from} → {ticket.trip.to}
            </p>
            <p>
              <strong>Giờ khởi hành:</strong> {ticket.trip.departureTime}
            </p>
          </div>
        </div> */}

        {/* Footer */}
        <div className="flex justify-end border-t pt-3">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDetail;
