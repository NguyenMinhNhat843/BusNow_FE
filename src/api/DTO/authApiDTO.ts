import { RoleEnum } from "../Enum/RoleEnum";

interface RequestRegisterDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: RoleEnum;
  otp?: string;
  phoneNumber?: string;
  address?: string;
  type?: string; // optional
  isInternalAdminCreate?: boolean; // optional
}

export type { RequestRegisterDTO };
