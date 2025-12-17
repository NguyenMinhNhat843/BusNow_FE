"use client";
import { Tabs, TabsList } from "@mantine/core";
import Tab_TuyenDuong from "./Tab_TuyenDuong";

export default function ManagerRoute() {
  const TabsConfig = [
    {
      label: "Tuyến đường",
      content: <Tab_TuyenDuong />,
    },
    {
      label: "Tỉnh thành",
      content: <span>abc</span>,
    },
  ];

  return (
    <div className="py-2 px-4">
      <Tabs defaultValue={TabsConfig[0].label}>
        <TabsList>
          {TabsConfig.map((item) => (
            <Tabs.Tab key={item.label} value={item.label}>
              {item.label}
            </Tabs.Tab>
          ))}
        </TabsList>

        {TabsConfig.map((config) => (
          <Tabs.Panel key={config.label} value={config.label}>
            {config.content}
          </Tabs.Panel>
        ))}
      </Tabs>
    </div>
  );
}
