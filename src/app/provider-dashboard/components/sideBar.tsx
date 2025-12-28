"use client";

import { NavLink } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";

const sideBarItems = [
  {
    value: "quan_ly_xe",
    name: "Quản lý xe",
    link: "/provider-dashboard/quan-ly-xe",
  },
  {
    value: "quan_ly_tuyen_duong",
    name: "Quản lý tuyến đường",
    link: "/provider-dashboard/quan-ly-tuyen-duong",
  },
  {
    value: "quan-ly-ve-huy",
    name: "Quản lý vé hủy",
    link: "/provider-dashboard/quan-ly-ve-huy",
  },
  {
    value: "quan-ly-ve",
    name: "Quản lý vé",
    link: "/provider-dashboard/quan-ly-ve",
  },
];

export default function SideBar() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="flex flex-col justify-around">
      {sideBarItems.map((item) => {
        return (
          <NavLink
            key={item.value}
            label={item.name}
            active={pathname === item.link}
            onClick={() => {
              router.push(item.link);
            }}
            color="yellow"
            variant="light"
          />
        );
      })}
    </div>
  );
}
