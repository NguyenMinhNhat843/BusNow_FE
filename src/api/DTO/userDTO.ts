class ResponseGetMe {
  userId!: string;
  avatar!: string | null;
  firstName!: string;
  lastName!: string;
  birthDate!: string | null;
  address!: string | null;
  email!: string;
  phoneNumber!: string | null;
  password!: string;
  provider!: string | null;
  isActive!: boolean;
  role!: "user" | "admin" | "provider";
  // Dấu ! là để tránh lỗi "posible undefine"

  constructor(partial: Partial<ResponseGetMe>) {
    Object.assign(this, partial);
  }
}

export { ResponseGetMe };
