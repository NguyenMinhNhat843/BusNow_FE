"use client";

import { authApi } from "@/api/authApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface FormData {
  email: string;
  password: string;
}

export default function AdminLoginPage() {
  // common
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    email: "admin@gmail.com",
    password: "Pass@123",
  });

  const handleChangeFormData = (e: any) => {
    const { value, name } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Call api login
  const handleLoginApi = async () => {
    try {
      const response = await authApi.login(formData.email, formData.password);
      if (response.status === 200) {
        toast.success("Login thành công!!!");
        router.push("admin-dashboard");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra!!!");
    }
  };

  return (
    <div className="p-8">
      {/* form login */}
      <div className="w-[500px] mx-auto shadow-2xl p-4 rounded-md">
        <p className="font-bold text-lg text-center">Đăng nhập admin</p>
        {/* username */}
        <div className="pb-4">
          <label htmlFor="" className="font-bold pb-2">
            Username:{" "}
          </label>
          <input
            type="text"
            name="email"
            className="p-2 rounded-md w-full border border-salte-200"
            value={formData.email}
            onChange={(e) => handleChangeFormData(e)}
          />
        </div>

        {/* password */}
        <div className="pb-4">
          <label htmlFor="" className="font-bold pb-2">
            Password:{" "}
          </label>
          <input
            type="password"
            name="password"
            className="p-2 rounded-md w-full border border-salte-200"
            value={formData.password}
            onChange={(e) => handleChangeFormData(e)}
          />
        </div>

        {/* button */}
        <div className="flex justify-center">
          <button
            className="px-4 py-2 rounded-md cursor-pointer bg-yellow-400 hover:bg-yellow-500"
            onClick={handleLoginApi}
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}
