"use client";

import logo from "../../../public/logo.webp";
// import avatarDefault from "../../public/avatar_default.png";
import avatarDefault from "../../../public/avatar_default.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logout, setUser } from "@/redux/slice/authSlice";
import { set } from "date-fns";
import { authApi } from "@/api/authApi";
import { toast } from "sonner";
import { userApi } from "@/api/userApi";

const tabMenuUser = [
  {
    name: "Thông tin cá nhân",
    link: "/thong-tin-ca-nhan",
  },
  {
    name: "Đổi mật khẩu",
    link: "/doi-mat-khau",
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
  const [isOpenMenuUser, setIsOpenMenuUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleNaviagteLogin = () => {
    router.push("/dang-nhap");
  };

  // Vì đổi lưu token trong httpOnly cookie nên không cần kiểm tra token trong localStorage nữa
  // Mà phải call api logout phía server để xóa cookie
  const handleLogout = async () => {
    const response = await authApi.logout();
    if (response.status === 200) {
      toast.success("Đăng xuất thành công!");
      localStorage.removeItem("user");
    }
    dispatch(logout());
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // handle click "Đơn hàng của tôi"
  const handleMyOrdersClick = () => {
    router.push("/tra-cuu-don-hang");
    // if (!user) {
    // } else {
    //   router.push("/don-hang-cua-toi");
    // }
  };

  // handle click "Hợp tác với chúng tôi"
  const handleCooperateClick = () => {
    router.push("/hop-tac-voi-chung-toi");
  };

  return (
    <div className="relative flex justify-between items-center bg-white shadow-lg h-[70px] z-[999]">
      {/* logo */}
      <div
        className="relative h-full aspect-[3/2] mx-4 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image src={logo} alt="logo" fill className="object-cover" />
      </div>

      {/* menu */}
      <div className="h-[50px] flex items-center justify-between gap-4 p-4">
        <p
          className="cursor-pointer hover:text-shadow-2xs"
          onClick={() => handleMyOrdersClick()}
        >
          Quản lý đơn hàng
        </p>
        <p
          className="cursor-pointer hover:text-shadow-2xs"
          onClick={() => handleCooperateClick()}
        >
          Hợp tác với chúng tôi
        </p>
        {/* menu user */}
        <div className="flex items-center gap-4">
          {user ? (
            <div>
              <div
                className="relative h-full flex items-center justify-between gap-2 cursor-pointer"
                onClick={() => setIsOpenMenuUser(!isOpenMenuUser)}
              >
                <div className="relative h-[32px] aspect-square rounded-full">
                  <Image
                    // src={avatarDefault}
                    src={"/avatar_default.png"}
                    alt="avatar"
                    fill
                    className="object-cover"
                  />
                </div>
                <span>
                  {user.firstName} {user.lastName}
                </span>

                {isOpenMenuUser && (
                  <div className="absolute top-[calc(100%+12px)] right-0 rounded-lg bg-white shadow-2xl shadow-black w-[200px] z-50">
                    <ul className="py-4">
                      {tabMenuUser.map((item, index) => (
                        <li
                          key={index}
                          className="p-2 hover:bg-slate-100"
                          onClick={() => {
                            router.push(item.link);
                          }}
                        >
                          {item.name}
                        </li>
                      ))}
                      <li
                        className="p-2 hover:bg-slate-100"
                        onClick={handleLogout}
                      >
                        Đăng xuất
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button
              className="bg-yellow-400 rounded-lg py-2 px-4 cursor-pointer hover:bg-yellow-500"
              onClick={handleNaviagteLogin}
            >
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
