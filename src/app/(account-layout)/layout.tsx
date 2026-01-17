"use client";

import { Box, Stack, Title } from "@mantine/core";
import React, { FunctionComponent } from "react";
import { NavigationMenu } from "./NavigationMenu";
import { useAuthContext } from "../AuthContext";
import NotificationCard from "@/component/NotifyCard";

interface AccountLayoutProps {
  children: React.ReactNode;
}

const navigations = [
  {
    label: "Thông tin tài khoản",
    path: "/thong-tin-ca-nhan",
  },
  {
    label: "Đơn hàng của tôi",
    path: "/don-hang-cua-toi",
  },
  {
    label: "Đổi mật khẩu",
    path: "/doi-mat-khau",
  },
] as const;

const AccountLayout: FunctionComponent<AccountLayoutProps> = ({ children }) => {
  const { user } = useAuthContext();
  if (!user) {
    return (
      <NotificationCard
        message="Bạn cần đăng nhập để truy cập trang này."
        className="mt-20"
      />
    );
  }
  return (
    <Box
      className="flex max-w-5xl mx-auto mb-6"
      style={{ minHeight: "calc(100vh - 64px)" }}
    >
      {/* Sidebar */}
      <Box w={260} p="md">
        <Stack gap="lg">
          <Title order={5} className="text-gray-800">
            Quản lý tài khoản
          </Title>

          <NavigationMenu navigations={navigations} />
        </Stack>
      </Box>

      {/* Content */}
      <Box className="flex-1 p-6">{children}</Box>
    </Box>
  );
};

export default AccountLayout;
