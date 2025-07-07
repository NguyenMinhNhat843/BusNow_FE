"use client";

import { authApi } from "@/api/authApi";
import { RequestRegisterProviderDTO } from "@/api/DTO/authApiDTO";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateAccountProvicer() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RequestRegisterProviderDTO>({
    lastName: "Liên Hưng",
    email: "lienhung@gmail.com",
    phoneNumber: "0159368245",
    password: "Pass@123",
    address: "123 Gò Vấp, Hồ Chí Minh",
  });

  const handleOnChangeInput = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleRegisterApi = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await authApi.registerProvider(formData);
      if (response.status === "success") {
        toast.success("Đăng ký nhà xe thành công!!!");
        setFormData({
          lastName: "",
          email: "",
          phoneNumber: "",
          password: "",
          address: "",
        });
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra!!!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      {/* Overlay loading */}
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400"></div>
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-4 text-center">
        Tạo tài khoản nhà xe
      </h2>

      <form className="space-y-4" onSubmit={handleRegisterApi}>
        <div>
          <label className="block mb-1 font-medium">Tên nhà xe</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="VD: Nhà xe Thành Bưởi"
            name="lastName"
            value={formData.lastName}
            onChange={(e) => handleOnChangeInput(e)}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="example@provider.com"
            name="email"
            value={formData.email}
            onChange={(e) => handleOnChangeInput(e)}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Số điện thoại</label>
          <input
            type="tel"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="VD: 0909123456"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={(e) => handleOnChangeInput(e)}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Mật khẩu</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Nhập mật khẩu"
            name="password"
            value={formData.password}
            onChange={(e) => handleOnChangeInput(e)}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Địa chỉ trụ sở</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="VD: 123 Lê Văn Sỹ, Q.3, TP.HCM"
            name="address"
            value={formData.address}
            onChange={(e) => handleOnChangeInput(e)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Tạo tài khoản
        </button>
      </form>
    </div>
  );
}
