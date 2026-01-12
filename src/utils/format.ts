const format = {
  formatMoneyVND(amount: number): string {
    return Intl.NumberFormat("vi-VN").format(amount) + " đ";
  },

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);

    if (isNaN(date.getTime())) return "Ngày không hợp lệ";

    return date.toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  },
};

export default format;
