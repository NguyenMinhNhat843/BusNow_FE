"use client";

import { authApi } from "@/api/authApi";
import { logout } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function ChangePasswordPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  // state
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogout = async () => {
    const response = await authApi.logout();
    if (response.status === 200) {
      toast.success("Đăng xuất thành công!");
    }
    dispatch(logout());
    router.push("/");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (
        formData.oldPassword.trim() === "" ||
        formData.newPassword.trim() === ""
      ) {
        toast.error("Vui lòng nhập đầy đủ thông tin!");
        return;
      }

      await authApi.changePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });
      toast.success("Đổi mật khẩu thành công!");
      handleLogout(); // Đăng xuất sau khi đổi mật khẩu thành công
      setFormData({
        oldPassword: "",
        newPassword: "",
      });
    } catch (error: any) {
      console.error("Error changing password:", error);
      toast.error("Đổi mật khẩu thất bai: ", error.response.data.message[0]);
    }
  };

  return (
    <div className="flex justify-center pt-16">
      <form
        className="w-[500px] bg-white rounded-md shadow-lg p-8"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between items-center gap-4 mb-4">
          <label className="w-[120px]">Mật khẩu cũ: </label>
          <input
            type="password"
            className="grow bg-slate-100 py-2 px-4 rounded-md "
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChangeInput}
          />
        </div>
        <div className="flex justify-between items-center gap-4 mb-4">
          <label className="w-[120px]">Mật khẩu mới: </label>
          <input
            type="password"
            className="grow bg-slate-100 py-2 px-4 rounded-md "
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChangeInput}
          />
        </div>

        <div className="flex justify-center">
          <button className="py-2 px-4 rounded-md bg-yellow-400 hover:bg-yellow-500 cursor-pointer">
            Đổi mật khẩu
          </button>
        </div>
      </form>
    </div>
  );
}
