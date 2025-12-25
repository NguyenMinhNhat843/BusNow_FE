"use client";

import { authApi } from "@/api/authApi";
import { RoleEnum } from "@/api/Enum/RoleEnum";
import { login } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "minhnhat8843@gmail.com",
    password: "Pass@123",
  });

  const handleOnchange = async (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await authApi.login(formData.email, formData.password);
      if (response.status === 200) {
        toast.success("Đăng nhập thành công!", {
          duration: 2000,
        });
        if (response.user.role === RoleEnum.PROVIDER) {
          localStorage.setItem("user", JSON.stringify(response.user));
          router.push("provider-dashboard");
        } else {
          localStorage.setItem("user", JSON.stringify(response.user));
          dispatch(login({ user: response.user }));
          router.push("/");
        }
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại."
      );
    }
    setIsLoading(false);
  };

  const handleNaviagteRegister = () => {
    router.push("/dang-ky");
  };

  const handleNaviagteHome = () => {
    router.push("/");
  };

  const handleNavigateForgotPassword = () => {
    router.push("/quen-mat-khau");
  };

  const handleLoginWithGoogle = async () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-[500px]">
        <h1 className="text-2xl font-bold text-center pb-6">Đăng nhập</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="">
            <label className="font-bold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleOnchange}
              className="border border-gray-300 rounded-md py-1 px-2 w-full mt-2 mb-4"
              placeholder="Nhập email"
            />
          </div>
          <div className="">
            <label className="font-bold text-gray-700">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleOnchange}
              className="border border-gray-300 rounded-md py-1 px-2 w-full mt-2 mb-4"
              placeholder="Nhập mật khẩu"
            />
          </div>

          <p
            className="text-right text-blue-500 cursor-pointer hover:text-blue-600 hover:underline"
            onClick={handleNavigateForgotPassword}
          >
            Quên mật khẩu
          </p>

          <button className="w-full py-2 bg-yellow-400 rounded-lg my-4 cursor-pointer hover:bg-yellow-500">
            Đăng nhập
          </button>

          <p className="text-center pt-2">
            Bạn chưa có tài khoản?{" "}
            <span
              className="text-blue-400 cursor-pointer"
              onClick={handleNaviagteRegister}
            >
              Đăng ký ngay
            </span>
          </p>

          <p className="text-center pt-2">
            Bạn chưa muốn tạo tìa khoản?{" "}
            <span
              className="text-blue-400 cursor-pointer"
              onClick={handleNaviagteHome}
            >
              Vào trang chính
            </span>
          </p>

          {/* Đăngg nhập với google */}
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">hoặc</span>
            </div>
          </div>
          <div
            className="flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-md py-2 px-4 mb-4 cursor-pointer hover:bg-gray-100 transition"
            onClick={handleLoginWithGoogle}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              className="w-10 h-10"
            >
              <path d="M564 325.8C564 467.3 467.1 568 324 568C186.8 568 76 457.2 76 320C76 182.8 186.8 72 324 72C390.8 72 447 96.5 490.3 136.9L422.8 201.8C334.5 116.6 170.3 180.6 170.3 320C170.3 406.5 239.4 476.6 324 476.6C422.2 476.6 459 406.2 464.8 369.7L324 369.7L324 284.4L560.1 284.4C562.4 297.1 564 309.3 564 325.8z" />
            </svg>
            <span className="text-sm text-gray-700 font-medium">
              Đăng nhập với Google
            </span>
          </div>
        </form>
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
