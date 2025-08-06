import React from "react";

interface RefundCardProps {
  refund: any;
}

export default function RefundCard({ refund }: RefundCardProps) {
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString("vi-VN");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 mb-6 hover:shadow-xl transition-all max-w-3xl w-full mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Yêu cầu hoàn tiền
        </h2>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
            refund.status
          )}`}
        >
          {refund.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
        {/* Người yêu cầu */}
        <div>
          <p className="text-gray-500 font-medium mb-1">Người yêu cầu</p>
          <p>
            {refund.requestedBy.firstName} {refund.requestedBy.lastName}
          </p>
          <p>{refund.requestedBy.email}</p>
          <p>SĐT: {refund.requestedBy.phoneNumber}</p>
        </div>

        {/* Tài khoản ngân hàng */}
        <div>
          <p className="text-gray-500 font-medium mb-1">Thông tin tài khoản</p>
          <p>Chủ TK: {refund.accountHolderName}</p>
          <p>Ngân hàng: {refund.bankName}</p>
          <p>Số TK: {refund.accountNumber}</p>
        </div>

        {/* Ghi chú nếu có */}
        {refund.note && (
          <div className="md:col-span-2">
            <p className="text-gray-500 font-medium mb-1">Ghi chú</p>
            <p className="italic">{refund.note}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-6">
        <p className="text-xs text-gray-500">
          Gửi lúc: {formatDate(refund.createdAt)}
        </p>

        <button className="text-sm px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
          Cập nhật trạng thái
        </button>
      </div>
    </div>
  );
}
