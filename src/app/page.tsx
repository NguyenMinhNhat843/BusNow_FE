"use client";

import { RoleEnum } from "@/api/Enum/RoleEnum";
import HomePage from "../app/home/HomePage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [shouldShowHomePage, setShouldShowHomePage] = useState(false);

  useEffect(() => {
    const userLocal = localStorage.getItem("user"); //ádasd

    if (!userLocal) {
      setShouldShowHomePage(true);
      return;
    }

    const user = JSON.parse(userLocal);

    if (user.role === RoleEnum.ADMIN || user.role === RoleEnum.PROVIDER) {
      router.push("/provider-dashboard");
    } else {
      setShouldShowHomePage(true);
    }
  }, []);

  return shouldShowHomePage ? <HomePage /> : null;
}
