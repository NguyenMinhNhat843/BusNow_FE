"use client";

import { Center, Text } from "@mantine/core";
import { FunctionComponent, ReactNode } from "react";

interface NotFoundProps {
  message?: string; // thông báo tuỳ chỉnh
  height?: number | string; // chiều cao tuỳ chỉnh
  children?: ReactNode; // nếu muốn thêm icon hay component khác
}

const NotFound: FunctionComponent<NotFoundProps> = ({
  message = "Không tìm thấy dữ liệu",
  height = 200,
  children,
}) => {
  return (
    <Center h={height} className="flex-col" style={{ textAlign: "center" }}>
      <Text fw={500} size="md" color="dimmed">
        {message}
      </Text>
      {children}
    </Center>
  );
};

export default NotFound;
