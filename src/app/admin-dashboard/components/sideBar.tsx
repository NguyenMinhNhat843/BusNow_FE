"use client";

import { NavLink, Stack, Title } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";

const sideBarItems = [
  {
    name: "Tạo tài khoản nhà xe",
    link: "tao-tai-khoan-nha-xe",
  },
  {
    name: "Hợp tác",
    link: "yeu-cau-hop-tac",
  },
];

export default function SideBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Stack gap="xs">
      <Title order={5}>Admin Dashboard</Title>

      {sideBarItems.map((item) => {
        const href = `/admin-dashboard/${item.link}`;
        const isActive = pathname === href;

        return (
          <NavLink
            key={item.link}
            label={item.name}
            active={isActive}
            onClick={() => router.push(href)}
          />
        );
      })}
    </Stack>
  );
}
