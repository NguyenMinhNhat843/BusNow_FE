"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import isExpiredToken from "@/utils/decodeToken";
import { authApi } from "@/api/authApi";
import { toast } from "sonner";

export default function ChangePasswordPage() {
  // Lấy token từ query param
  const searchparams = useSearchParams();
  const token = searchparams.get("token");

  const isValidToken = isExpiredToken(token || "");

  // state
  const [password, setPassword] = useState("");
  const handleOnchange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    if (password.trim() === "") {
      toast.error("Mật khẩu không được để trống!");
      return;
    }
    if (isValidToken) {
      toast.error("Link đã hết hạn vui lòng thao tác lại");
      return;
    }
    try {
      const response = await authApi.resetPassword(token as string, password);
      toast.success("Mật khẩu đã được đặt lại thành công!");
    } catch (error: any) {
      toast.error("Có lỗi xảy ra: " + error.response.data.message);
    }
  };

  if (!token) {
    return (
      <div className="flex justify-center pt-16">Link không hợp lệ!!!</div>
    );
  }
  return (
    <div className="flex justify-center pt-16">
      {!isValidToken ? (
        <div className="p-6 rounded-md shadow-lg w-[500px]">
          <p className="font-bold pb-2">Đặt mật khẩu mới</p>
          <input
            type="pasword"
            name="pasword"
            value={password}
            onChange={handleOnchange}
            className="py-1 px-2 rounded-md border border-gray-200 w-full"
          />
          <div className="flex justify-center items-center pt-4">
            <button
              className="px-4 py-2 rounded-md bg-yellow-400 hover:bg-yellow-500 cursor-pointer "
              onClick={handleSubmit}
            >
              Xác nhận
            </button>
          </div>
        </div>
      ) : (
        <div>Link đã hết hạn vui lòng thao tác lại</div>
      )}
    </div>
  );
}
