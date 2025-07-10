"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const sideBarItems = [
  {
    value: "quan_ly_xe",
    name: "Quản lý xe",
    link: "/provider-dashboard/quan-ly-xe",
  },
  {
    value: "quan-ly-chuyen-di",
    name: "Quản lý chuyến đi",
    link: "/provider-dashboard/quan-ly-chuyen-di",
  },
  {
    value: "quan_ly_tuyen_duong",
    name: "Quản lý tuyến đường",
    link: "/provider-dashboard/quan-ly-tuyen-duong",
  },
];

export default function SideBar() {
  // common
  const router = useRouter();
  const path = usePathname();
  const endPoint = path.split("/")[2];
  const endPointDormatted = "";

  // state
  const [tabSelected, setTabSelected] = useState("");

  // handle
  const handleSelectTab = (tabItem: any) => {
    setTabSelected(tabItem.value);
    router.push(tabItem.link);
  };
  return (
    <div className="rounded-md shadow-md min-h-[500px] ">
      {sideBarItems.map((item) => (
        <div key={item.value}>
          <p
            className={`px-4 py-4 border-b border-b-slate-200 cursor-pointer hover:bg-yellow-500 ${
              tabSelected === item.value
                ? "bg-yellow-500"
                : endPointDormatted === item.value
                ? "bg-yellow-500"
                : ""
            }`}
            onClick={() => handleSelectTab(item)}
          >
            {item.name}
          </p>
        </div>
      ))}
    </div>
  );
}
