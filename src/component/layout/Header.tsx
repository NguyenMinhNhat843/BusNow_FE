"use client";

import logo from "../../../public/logo.webp";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RoleEnum } from "@/api/Enum/RoleEnum";
import { Avatar, Box, Button, Group, Menu, Text } from "@mantine/core";
import { IconBack, IconDown } from "@/type/icon";
import { useUSer } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";

const tabMenuUser = [
  {
    name: "Thông tin cá nhân",
    link: "/thong-tin-ca-nhan",
  },
  {
    name: "Đổi mật khẩu",
    link: "/doi-mat-khau",
  },
  {
    name: "Đơn hàng của tôi",
    link: "/don-hang-cua-toi",
  },
];

export default function Header() {
  // common
  const router = useRouter();
  const { useGetProfileMe } = useUSer();
  const { logout } = useAuth();
  const { data: user } = useGetProfileMe();

  const handleNaviagteLogin = () => {
    router.push("/dang-nhap");
  };

  const handleLogout = () => {
    logout();
  };

  const headerNavigation = [
    {
      label: "Đơn hàng của tôi",
      route: "don-hang-cua-toi",
      role: user?.role ? [String(RoleEnum.USER)].includes(user?.role) : true,
    },
    {
      label: "Hợp tác với chúng tôi",
      route: "hop-tac-voi-chung-toi",
      role: true,
    },
  ];

  return (
    <Box
      h={64}
      px="md"
      bg="white"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "var(--mantine-shadow-md)",
        zIndex: 10,
      }}
    >
      {/* Logo */}
      <Box
        w={120}
        h="100%"
        style={{ cursor: "pointer", position: "relative" }}
        onClick={() => router.push("/")}
      >
        <Image src={logo} alt="logo" fill className="object-contain" />
      </Box>

      {/* Right */}
      <Group gap="md">
        {/* Menu navigation */}
        {headerNavigation
          .filter((item) => item.role)
          .map((item) => (
            <Text
              key={item.label}
              fw={500}
              style={{ cursor: "pointer" }}
              onClick={() => router.push(`/${item.route}`)}
            >
              {item.label}
            </Text>
          ))}

        {/* User */}
        {user ? (
          <Menu width={200} position="bottom-end" shadow="md">
            <Menu.Target>
              <Group gap="xs" style={{ cursor: "pointer" }}>
                <Avatar src="/avatar_default.png" size="sm" />
                <Text size="sm">
                  {user.firstName} {user.lastName}
                </Text>
                <IconDown size={14} />
              </Group>
            </Menu.Target>

            <Menu.Dropdown>
              {tabMenuUser.map((item) => (
                <Menu.Item
                  key={item.name}
                  onClick={() => router.push(item.link)}
                >
                  {item.name}
                </Menu.Item>
              ))}

              <Menu.Divider />

              <Menu.Item
                color="red"
                leftSection={<IconBack size={14} />}
                onClick={handleLogout}
              >
                Đăng xuất
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <Button color="yellow" onClick={handleNaviagteLogin}>
            Đăng nhập
          </Button>
        )}
      </Group>
    </Box>
  );
}
