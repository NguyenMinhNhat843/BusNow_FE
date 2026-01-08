"use client";

import { RoleEnum } from "@/api/Enum/RoleEnum";
import { useAuth } from "@/hooks/useAuth";
import { IconGoogle, IconLock, IconMail } from "@/type/icon";
import {
  Button,
  Divider,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const { login, isPendingLogin } = useAuth();
  const router = useRouter();
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
    login(
      {
        email: formData.email,
        password: formData.password,
      },
      {
        onSuccess: (response: any) => {
          if (response.user.role === RoleEnum.PROVIDER) {
            router.push("provider-dashboard");
          } else {
            router.push("/");
          }
        },
      }
    );
  };

  const handleLoginWithGoogle = async () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-yellow-100 via-white to-blue-100">
      {/* Background blur blob */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-yellow-300 rounded-full blur-3xl opacity-30" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-30" />

      <Paper
        shadow="xl"
        radius="lg"
        p="xl"
        className="relative w-[420px] backdrop-blur-md bg-white/90 transition-all duration-300 hover:shadow-2xl"
      >
        <Text size="xl" fw={700} ta="center" mb={6}>
          Đăng nhập
        </Text>
        <Text size="sm" c="dimmed" ta="center" mb="lg">
          Chào mừng bạn quay lại
        </Text>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInput
            label="Email"
            placeholder="email@example.com"
            leftSection={<IconMail size={18} />}
            value={formData.email}
            name="email"
            onChange={handleOnchange}
            radius="md"
            required
            classNames={{
              input:
                "transition focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400",
            }}
          />

          <PasswordInput
            label="Mật khẩu"
            placeholder="••••••••"
            leftSection={<IconLock size={18} />}
            value={formData.password}
            name="password"
            onChange={handleOnchange}
            radius="md"
            required
          />

          <div
            className="text-right text-sm text-blue-500 cursor-pointer hover:underline"
            onClick={() => router.push("/quen-mat-khau")}
          >
            Quên mật khẩu?
          </div>

          <Button
            type="submit"
            fullWidth
            radius="md"
            size="md"
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 hover:-translate-y-0.5"
            loading={isPendingLogin}
          >
            Đăng nhập
          </Button>

          <Divider label="hoặc" labelPosition="center" />

          {/* Google login */}
          <button
            type="button"
            onClick={handleLoginWithGoogle}
            className="flex items-center cursor-pointer justify-center gap-3 w-full border border-gray-300 rounded-md py-2 transition hover:bg-gray-100 hover:shadow-sm"
          >
            <IconGoogle size={24} color="red" />
            <span className="font-medium text-gray-700">
              Đăng nhập với Google
            </span>
          </button>

          <Text size="sm" ta="center">
            Chưa có tài khoản?{" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => router.push("/dang-ky")}
            >
              Đăng ký ngay
            </span>
          </Text>

          <Text size="sm" ta="center">
            Chưa muốn tạo tài khoản?{" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => router.push("/")}
            >
              Về trang chủ
            </span>
          </Text>
        </form>
      </Paper>
    </div>
  );
}
