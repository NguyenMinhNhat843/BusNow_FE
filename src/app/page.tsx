"use client";

import { RoleEnum } from "@/api/Enum/RoleEnum";
import HomePage from "../app/home/HomePage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader } from "@mantine/core";
import { useAuthContext } from "./AuthContext";

export default function Page() {
  const { user, isError, isLoading } = useAuthContext();
  const router = useRouter();
  console.log(user);

  useEffect(() => {
    if (!isLoading && user?.role === RoleEnum.PROVIDER) {
      router.push("/provider-dashboard");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-44">
        <Loader size={50} />
      </div>
    );
  }

  if (isError || !user || user.role === RoleEnum.PROVIDER) {
    if (user?.role === RoleEnum.PROVIDER) return null;
    return <HomePage />;
  }

  return <HomePage />;
}
