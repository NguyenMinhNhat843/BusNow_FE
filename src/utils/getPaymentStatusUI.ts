export type PaymentStatus = "PAID" | "UNPAID" | "CANCELLED";

export function getPaymentStatusUI(status: PaymentStatus) {
  switch (status) {
    case "PAID":
      return { color: "green", label: "Đã thanh toán" };
    case "UNPAID":
      return { color: "yellow", label: "Chưa thanh toán" };
    case "CANCELLED":
      return { color: "gray", label: "Đã hủy" };
    default:
      return { color: "gray", label: "Không xác định" };
  }
}
