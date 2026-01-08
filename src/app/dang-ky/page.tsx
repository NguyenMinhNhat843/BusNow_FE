"use client";
import { authApi } from "@/api/authApi";
import { RequestRegisterDTO } from "@/api/DTO/authApiDTO";
import { RoleEnum } from "@/api/Enum/RoleEnum";
import { IconLock, IconMail, IconUser } from "@/type/icon";
import { Button, Paper, PasswordInput, Text, TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [isOtpForm, setIsOtpForm] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Nguyễn Thị",
    lastName: "Chí Phèo",
    email: "minhnhat8843@gmail.com",
    password: "Pass@123",
    confirmPassword: "Pass@123",
  });

  const onChangeInput = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { email } = formData;
    setIsLoading(true);
    try {
      const response = await authApi.sendOtpRegister(email);
      if (response) {
        toast.success(
          "Đã gửi mã OTP đến email của bạn. Vui lòng kiểm tra hộp thư."
        );
        setIsOtpForm(true);
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Đăng ký thất bại. Vui lòng thử lại sau."
      );
    }
    setIsLoading(false);
  };

  const handleVerifyOtp = async () => {
    setIsOtpForm(false);
    setIsLoading(true);
    try {
      const data: RequestRegisterDTO = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        otp: otp,
        role: RoleEnum.USER,
      };
      await authApi.register(data);
      toast.success("Đăng ký thành công!");
      router.push("/dang-nhap");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Xác thực OTP thất bại. Vui lòng thử lại."
      );
    }
    setIsLoading(false);
  };

  const handleNaviagteLogin = () => {
    router.push("/dang-nhap");
  };

  const handleNaviagteHome = () => {
    router.push("/");
  };

  const registerFields = [
    {
      label: "Họ và tên đệm",
      name: "firstName",
      placeholder: "Nhập họ và tên đệm",
      icon: <IconUser size={18} />,
      type: "text",
    },
    {
      label: "Tên",
      name: "lastName",
      placeholder: "Nhập tên",
      icon: <IconUser size={18} />,
      type: "text",
    },
    {
      label: "Email",
      name: "email",
      placeholder: "email@example.com",
      icon: <IconMail size={18} />,
      type: "email",
    },
  ];

  return (
    <div className="relative flex items-center justify-center overflow-hidden min-h-screen bg-gradient-to-br from-yellow-100 via-white to-blue-100">
      {/* Blur blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-yellow-300 rounded-full blur-3xl opacity-30" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-30" />

      <Paper
        shadow="xl"
        radius="lg"
        p="xl"
        className="relative w-[480px] bg-white/90 backdrop-blur transition-all duration-300 hover:shadow-2xl"
      >
        <Text size="xl" fw={700} ta="center" mb={4}>
          Đăng ký tài khoản
        </Text>
        <Text size="sm" c="dimmed" ta="center" mb="lg">
          Tạo tài khoản mới chỉ trong vài bước
        </Text>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Text inputs */}
          {registerFields.map((field) => (
            <TextInput
              key={field.name}
              label={field.label}
              placeholder={field.placeholder}
              leftSection={field.icon}
              name={field.name}
              value={formData[field.name as keyof typeof formData]}
              onChange={onChangeInput}
              required
              radius="md"
            />
          ))}

          {/* Password */}
          <PasswordInput
            label="Mật khẩu"
            placeholder="••••••••"
            leftSection={<IconLock size={18} />}
            name="password"
            value={formData.password}
            onChange={onChangeInput}
            required
            radius="md"
          />

          <PasswordInput
            label="Nhập lại mật khẩu"
            placeholder="••••••••"
            leftSection={<IconLock size={18} />}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={onChangeInput}
            required
            radius="md"
          />

          <Button
            type="submit"
            fullWidth
            radius="md"
            size="md"
            loading={isLoading}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 hover:-translate-y-0.5"
          >
            Đăng ký tài khoản
          </Button>

          <Text size="sm" ta="center">
            Đã có tài khoản?{" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={handleNaviagteLogin}
            >
              Đăng nhập ngay
            </span>
          </Text>

          <Text size="sm" ta="center">
            Chưa muốn tạo tài khoản?{" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={handleNaviagteHome}
            >
              Về trang chủ
            </span>
          </Text>
        </form>
      </Paper>

      {/* OTP Overlay */}
      {isOtpForm && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm">
          <Paper
            radius="lg"
            shadow="xl"
            p="xl"
            className="w-[420px] animate-fade-in"
          >
            <Text fw={600} mb={6}>
              Xác thực OTP
            </Text>
            <Text size="sm" c="dimmed" mb="md">
              Nhập mã OTP đã được gửi tới email của bạn
            </Text>

            <TextInput
              placeholder="Nhập mã OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              radius="md"
              required
            />

            <Button
              fullWidth
              mt="md"
              onClick={handleVerifyOtp}
              className="bg-yellow-400 hover:bg-yellow-500 transition"
            >
              Xác nhận OTP
            </Button>
          </Paper>
        </div>
      )}
    </div>
  );
}
