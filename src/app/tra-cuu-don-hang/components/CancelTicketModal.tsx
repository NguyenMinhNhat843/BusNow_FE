import { ticketApi } from "@/api/ticketApi";
import React, { useState } from "react";
import { toast } from "sonner";

interface CancelTicketModalProps {
  onClose: () => void;
  onSubmit: (data: {
    bankAccountName: string;
    bankAccountNumber: string;
    bankName: string;
  }) => void;
  body: {
    ticketId: string;
  };
}

const CancelTicketModal: React.FC<CancelTicketModalProps> = ({
  onClose,
  onSubmit,
  body,
}) => {
  const [bankAccountName, setBankAccountName] =
    React.useState("Nguyen Minh Nhat");
  const [bankAccountNumber, setBankAccountNumber] =
    React.useState("0123456789");
  const [bankName, setBankName] = React.useState("Agribank");
  const [email, setEmail] = useState("minhnhat8843@gmail.com");
  const [openVerifyOTP, setOpenVerifyOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await ticketApi.cancleTicket(body.ticketId, {
        bankAccountName,
        accountNumber: bankAccountNumber,
        bankName,
        emailRequest: email,
      });

      if (response.status === "success") {
        setOpenVerifyOTP(true);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }

    onSubmit({ bankAccountName, bankAccountNumber, bankName });
    // onClose(); // Đóng modal sau khi submit
  };

  const handleConfirmCancel = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-40 flex items-center justify-center">
      {/* Spinner */}
      {loading && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400"></div>
        </div>
      )}
      <form
        onSubmit={!openVerifyOTP ? handleSubmit : handleConfirmCancel}
        className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 rounded-full hover:bg-slate-200 
            text-gray-500 hover:text-gray-800 text-3xl font-bold transition-colors
            w-10 h-10 flex justify-center items-center cursor-pointer"
          aria-label="Đóng"
        >
          <span>&times;</span>
        </button>
        <h2 className="text-xl font-semibold mb-4">Hủy đơn và hoàn tiền</h2>

        <div className="mb-3">
          <label className="block mb-1">Tên chủ tài khoản</label>
          <input
            type="text"
            value={bankAccountName}
            onChange={(e) => setBankAccountName(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1">Số tài khoản</label>
          <input
            type="text"
            value={bankAccountNumber}
            onChange={(e) => setBankAccountNumber(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Ngân hàng</label>
          <input
            type="text"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>

        {/* Xác nhận chính chủ */}
        <div className="mb-4">
          <label className="block mb-1 text-red-400 font-bold">
            Nhập Email để xác minh *:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>

        {openVerifyOTP && (
          <div className="mb-4">
            <label className="block mb-1 text-red-400 font-bold">
              Nhập OTP đã gửi qua gmail để xác thực thông tin
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              required
            />
          </div>
        )}

        <div className="flex justify-center gap-2">
          <button
            type="submit"
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            {openVerifyOTP ? "hủy vé" : "Xác minh"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CancelTicketModal;
