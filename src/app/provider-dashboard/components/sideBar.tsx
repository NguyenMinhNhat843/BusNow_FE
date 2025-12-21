"use client";

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
];

export default function SideBar() {
  const pathname = usePathname();
  return (
    <div className="flex flex-col justify-around">
      {sideBarItems.map((item) => {
        const isActive = pathname.startsWith(item.link);

        return (
          <div key={item.value}>
            <p
              className={`px-4 py-4 transition-all cursor-pointer hover:bg-yellow-500 ${
                isActive ? "bg-yellow-500" : ""
              }`}
              onClick={() => {
                window.location.href = item.link;
              }}
            >
              {item.name}
            </p>
          </div>
        );
      })}
    </div>
  );
}
