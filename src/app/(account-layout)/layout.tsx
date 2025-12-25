"use client";

import { IconAdd } from "@/type/icon";
import { Box, NavLink, Stack, Title } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";
import React, { FunctionComponent } from "react";

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
];

const AccountLayout: FunctionComponent<AccountLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
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

          {navigations.map((navi) => (
            <NavLink
              key={navi.label}
              label={navi.label}
              //   leftSection={<IconAdd size={18} />}
              active={pathname === navi.path}
              onClick={() => router.push(navi.path)}
            />
          ))}
        </Stack>
      </Box>

      {/* Content */}
      <Box className="flex-1 p-6">{children}</Box>
    </Box>
  );
};

export default AccountLayout;
