"use client";

import { Box } from "@mantine/core";
import SideBar from "./components/sideBar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      className="flex bg-gray-50"
      style={{
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <Box w={280} bg="white" p="md" className="border-r border-slate-300">
        <SideBar />
      </Box>

      <Box className="flex-1 p-6">{children}</Box>
    </Box>
  );
}
