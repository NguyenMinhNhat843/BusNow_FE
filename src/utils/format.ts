const format = {
  formatMoneyVND(amount: number): string {
    return Intl.NumberFormat("vi-VN").format(amount);
  },
};

export default format;
