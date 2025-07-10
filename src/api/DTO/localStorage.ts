export interface UserInterface {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string | null;
  birthDate: string | null;
  address: string | null;
  avatar: string | null;
  isActive: boolean;
  role: "provider" | "admin" | "user"; // thêm các vai trò nếu có
  provider: any; // nếu bạn có kiểu cụ thể cho provider thì thay any
}
