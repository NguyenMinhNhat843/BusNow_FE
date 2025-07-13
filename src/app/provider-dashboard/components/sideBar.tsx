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
    value: "quan_ly_chuyen_di",
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
  let endPoint = null;
  if (path.split("/").length >= 2) {
    endPoint = path.split("/")[2];
  }
  const endPointDormatted = endPoint?.replaceAll("-", "_");

  // state
  const [tabSelected, setTabSelected] = useState("");

  // handle
  const handleSelectTab = (tabItem: any) => {
    setTabSelected(tabItem.value);
    router.push(tabItem.link);
  };
  return (
    <div className="flex justify-around rounded-md shadow-md">
      {sideBarItems.map((item) => (
        <div key={item.value}>
          <p
            className={`px-4 py-4 border-b-slate-100 transition-all cursor-pointer border-b-4 hover:border-b-yellow-500 ${
              tabSelected === item.value
                ? "border-b-yellow-500"
                : endPointDormatted === item.value
                ? "border-b-yellow-500"
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
