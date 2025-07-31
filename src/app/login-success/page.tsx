"use client";

import { userApi } from "@/api/userApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function LoginSuccess() {
  const router = useRouter();

  useEffect(() => {
    const getMe = async () => {
      try {
        const response = await userApi.getProfileMe();
        if (response.userId) {
          router.push("/");
          toast.success("Đăng nhập thành công!");
        } else {
          toast.error("Đăng nhập thất bại! Vui lòng thử lại");
          router.push("/login");
        }
      } catch (error: any) {
        console.log(error);
        toast.error(error);
      }
    };

    getMe();
  }, []);
  return <></>;
}
