"use client";

import logo from "../../../public/logo.webp";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logout, setUser } from "@/redux/slice/authSlice";
import { authApi } from "@/api/authApi";
import { userApi } from "@/api/userApi";
import { RoleEnum } from "@/api/Enum/RoleEnum";
import { Avatar, Box, Button, Group, Menu, Text } from "@mantine/core";
import { IconBack, IconDown } from "@/type/icon";

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
  const dispatch = useDispatch();

  // redux
  useEffect(() => {
    const getMe = async () => {
      try {
        const res = await userApi.getProfileMe();

        if (res.userId) {
          dispatch(setUser(res));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        dispatch(logout());
        console.log(error);
      }
    };

    getMe();
  }, []);

  // state
  const user = useSelector((state: RootState) => state.auth.user);

  const handleNaviagteLogin = () => {
    router.push("/dang-nhap");
  };

  // Vì đổi lưu token trong httpOnly cookie nên không cần kiểm tra token trong localStorage nữa
  // Mà phải call api logout phía server để xóa cookie
  const handleLogout = async () => {
    const response = await authApi.logout();
    if (response.status === 200) {
      localStorage.removeItem("user");
    }
    dispatch(logout());
    router.push("/");
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
      role: user?.role ? [String(RoleEnum.ADMIN)].includes(user?.role) : false,
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
