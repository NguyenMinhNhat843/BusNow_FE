"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const sideBarItems = [
  {
    value: "manager_order",
    name: "Quản lý đơn hàng người dùng",
    link: "quan-ly-don-hang",
  },
  {
    value: "manager_provider",
    name: "Quản lý nhà xe",
    link: "quan-ly-nha-xe",
  },
  {
    value: "create_account_provider",
    name: "Tạo tài khoản nhà xe",
    link: "tao-tai-khoan-nha-xe",
  },
];

export default function SideBar() {
  //common
  const router = useRouter();

  // state
  const [tabSelected, setTabSelected] = useState<string>("");

  const handelSelectTab = ({ tab, link }: { tab: string; link: string }) => {
    setTabSelected(tab);
    router.push(`/admin-dashboard/${link}`);
  };

  return (
    <div>
      {sideBarItems.map((item) => (
        <div key={item.value}>
          <p
            className={`py-4 px-6 cursor-pointer hover:bg-slate-300 ${
              tabSelected === item.value && "bg-yellow-400"
            }`}
            onClick={() =>
              handelSelectTab({ tab: item.value, link: item.link })
            }
          >
            {item.name}
          </p>
        </div>
      ))}
    </div>
  );
}
