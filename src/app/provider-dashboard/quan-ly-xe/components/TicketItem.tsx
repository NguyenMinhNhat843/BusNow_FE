import React from "react";

interface TicketItemProps {
  ticketId: string;
  status: string;
  createdAt: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  seatId: string;
  seatCode: number;
  paymentId: string;
  amount: number;
  paymentTime: string;
  paymentStatus: string;
}

const TicketItem = ({ ticket }: { ticket: TicketItemProps }) => {
  const {
    ticketId,
    status,
    createdAt,
    userId,
    firstName,
    lastName,
    email,
    phoneNumber,
    seatId,
    seatCode,
    paymentId,
    amount,
    paymentTime,
    paymentStatus,
  } = ticket;
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white mb-4">
      <div className="text-sm text-gray-800 mb-2">
        <span className="text-gray-500">Mã vé:</span> {ticketId}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-sm text-gray-700">
        <div>
          <span className="text-gray-500">Trạng thái:</span>{" "}
          <span
            className={`font-semibold ${
              status === "PAID" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status}
          </span>
        </div>

        <div>
          <span className="text-gray-500">Ngày đặt:</span>{" "}
          {new Date(createdAt).toLocaleString()}
        </div>

        <div>
          <span className="text-gray-500">Tên khách:</span> {firstName}{" "}
          {lastName}
        </div>

        <div>
          <span className="text-gray-500">Email:</span> {email}
        </div>

        <div>
          <span className="text-gray-500">SĐT:</span> {phoneNumber ?? "Chưa có"}
        </div>

        <div>
          <span className="text-gray-500">Mã ghế:</span> {seatCode}
        </div>

        <div>
          <span className="text-gray-500">Thanh toán:</span>{" "}
          {amount.toLocaleString()}đ
        </div>

        <div>
          <span className="text-gray-500">Tình trạng thanh toán:</span>{" "}
          <span
            className={`font-semibold ${
              paymentStatus === "PAID" ? "text-green-600" : "text-orange-500"
            }`}
          >
            {paymentStatus}
          </span>
        </div>

        <div>
          <span className="text-gray-500">Thời gian thanh toán:</span>{" "}
          {new Date(paymentTime).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default TicketItem;
