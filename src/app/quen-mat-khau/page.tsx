"use client";

import { authApi } from "@/api/authApi";
import { useState } from "react";
import { toast } from "sonner";

export default function ForgotPassWordPage() {
  const [email, setEmail] = useState("minhnhat8843@gmail.com");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (email.trim() === "") {
      toast.error("Email không được để trống!");
      return;
    }

    setIsLoading(true);
    try {
      await authApi.sendResetPasswordLink(email);
      toast.success(
        "Đường dẫn đặt lại mật khẩu đã được gửi đến email của bạn. Vui lòng kiểm tra email để tiếp tục."
      );
      setEmail(""); // Reset email input after successful submission
    } catch (error: any) {
      toast.error("Có lỗi: ", error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center pt-16 h-screen">
      <div className="w-[500px] h-[150px] bg-white shadow-lg rounded-lg p-4">
        <p className="pb-2 font-bold">Nhập email</p>
        <input
          type="email"
          name="email"
          placeholder="Nhập email"
          className="border border-gray-200 rounded-200 px-2 py-1 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex justify-center items-center pt-4">
          <button
            className="py-2 px-4 rounded-md bg-yellow-400 cursor-pointer hover:bg-yellow-500"
            onClick={handleSubmit}
          >
            Xác nhận
          </button>
        </div>
      </div>
      {isLoading && (
        <div>
          <div className="absolute top-0 left-0 w-full h-full bg-black/40 flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400"></div>
          </div>
        </div>
      )}
    </div>
  );
}
