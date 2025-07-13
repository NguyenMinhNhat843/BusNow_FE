"use client";

import SideBar from "./components/sideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-between gap-6">
      <div className="m-6 bg-white rounded-md overflow-hidden shadow-2xl">
        <SideBar />
      </div>
      <div className="grow rounded-md my-6">{children}</div>
    </div>
  );
}
