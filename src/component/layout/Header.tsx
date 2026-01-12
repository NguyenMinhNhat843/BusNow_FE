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
    logout(undefined, {
      onSuccess: () => {
        router.push("/");
      },
    });
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
      className="
    sticky top-0 z-50
    bg-white
    border-b border-gray-100
    transition-shadow duration-300
    shadow-lg
  "
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Logo */}
      <Box
        w={120}
        h="100%"
        className="relative cursor-pointer transition-opacity hover:opacity-80"
        onClick={() => router.push("/")}
      >
        <Image src={logo} alt="logo" fill className="object-contain" />
      </Box>

      {/* Right */}
      <div className="flex items-center gap-6">
        {/* Navigation */}
        <div className="flex items-center gap-6">
          {headerNavigation
            .filter((item) => item.role)
            .map((item) => (
              <div
                key={item.label}
                onClick={() => router.push(`/${item.route}`)}
                className="
              relative cursor-pointer text-sm font-medium text-gray-700
              after:absolute after:-bottom-1 after:left-0 after:h-[2px]
              after:w-0 after:bg-yellow-400
              hover:after:w-full
              after:transition-all after:duration-300
            "
              >
                {item.label}
              </div>
            ))}
        </div>

        {/* User / Auth */}
        {user ? (
          <Menu width={200} position="bottom-end" shadow="md" withArrow>
            <Menu.Target>
              <div className="flex items-center gap-2 cursor-pointer group">
                <Avatar
                  src="/avatar_default.png"
                  size="sm"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
                <span className="text-sm font-medium text-gray-700">
                  {user.firstName} {user.lastName}
                </span>
                <IconDown size={14} className="text-gray-500" />
              </div>
            </Menu.Target>

            <Menu.Dropdown className="py-2">
              {tabMenuUser.map((item) => (
                <Menu.Item
                  key={item.name}
                  onClick={() => router.push(item.link)}
                  className="transition hover:bg-gray-50"
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
          <Button
            radius="md"
            className="
          bg-gradient-to-r from-yellow-400 to-yellow-500
          hover:from-yellow-500 hover:to-yellow-600
          transition-all duration-300
          hover:-translate-y-0.5
        "
            onClick={handleNaviagteLogin}
          >
            Đăng nhập
          </Button>
        )}
      </div>
    </Box>
  );
}
