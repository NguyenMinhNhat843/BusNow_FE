import React from "react";

interface CancelTicketModalProps {
  onClose: () => void;
  onSubmit: (data: {
    bankAccountName: string;
    bankAccountNumber: string;
    bankName: string;
  }) => void;
}

const CancelTicketModal: React.FC<CancelTicketModalProps> = ({
  onClose,
  onSubmit,
}) => {
  const [bankAccountName, setBankAccountName] = React.useState("");
  const [bankAccountNumber, setBankAccountNumber] = React.useState("");
  const [bankName, setBankName] = React.useState("");

  const handleSubmit = () => {
    if (!bankAccountName || !bankAccountNumber || !bankName) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    onSubmit({ bankAccountName, bankAccountNumber, bankName });
    onClose(); // Đóng modal sau khi submit
  };

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
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
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1">Số tài khoản</label>
          <input
            type="text"
            value={bankAccountNumber}
            onChange={(e) => setBankAccountNumber(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Ngân hàng</label>
          <input
            type="text"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
            onClick={handleSubmit}
          >
            Xác nhận hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelTicketModal;
