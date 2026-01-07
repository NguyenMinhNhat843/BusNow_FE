import { Box, Stack, Title } from "@mantine/core";
import React, { FunctionComponent } from "react";
import { NavigationMenu } from "./NavigationMenu";

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
  return (
    <Box
      className="flex min-h-full grow bg-gray-50"
      style={{
        minHeight: "calc(100vh - 64px)",
      }}
    >
      {/* Sidebar */}
      <Box w={260} bg="white" className="border-r border-slate-400" p="md">
        <Stack gap="lg">
          <Title order={5}>Tài khoản</Title>

          {/* Tách phần interactive thành Client Component riêng */}
          <NavigationMenu navigations={navigations} />
        </Stack>
      </Box>

      {/* Content */}
      <Box className="flex-1 p-6">{children}</Box>
    </Box>
  );
};

export default AccountLayout;
