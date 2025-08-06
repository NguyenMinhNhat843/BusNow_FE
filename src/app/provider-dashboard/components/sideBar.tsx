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
    <div className="flex flex-col justify-around rounded-md">
      {sideBarItems.map((item) => (
        <div key={item.value}>
          <p
            className={`px-4 py-4 transition-all cursor-pointer hover:bg-yellow-500 ${
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
