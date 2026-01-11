"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  return (
    <div className="flex flex-col justify-around">
      {sideBarItems.map((item) => {
        const isActive = pathname === item.link;

        return (
          <Link
            key={item.value}
            href={item.link}
            className={clsx(
              "px-4 py-2 transition-colors",
              "hover:bg-yellow-400",
              isActive && "bg-yellow-400 font-semibold text-slate-700"
            )}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
}
