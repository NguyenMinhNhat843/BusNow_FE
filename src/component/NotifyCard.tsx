"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, Group, Text, Button } from "@mantine/core";
import { IconArrowRight } from "@/type/icon";

export type NotificationCardProps = {
  icon?: React.ReactNode;
  title?: string;
  message: string;
  buttonLabel?: string;
  href?: string;
  onButtonClick?: () => void;
  className?: string;
};

export default function NotificationCard({
  title,
  message,
  buttonLabel = "Quay về trang chủ",
  href,
  onButtonClick,
  className,
}: NotificationCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onButtonClick) return onButtonClick();
    if (href) return router.push(href);
    return router.push("/");
  };

  return (
    <Card
      shadow="sm"
      radius="md"
      withBorder
      className={`max-w-xl mx-auto p-6 ${className ?? ""}`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex flex-col justify-center items-center">
        <Group className="mb-4">
          <div className="flex-1">
            {title && (
              <Text size="lg" fw={700} mb={4}>
                {title}
              </Text>
            )}

            <Text size="sm" c="dimmed">
              {message}
            </Text>
          </div>
        </Group>

        <Group>
          <Button
            rightSection={<IconArrowRight size={16} />}
            onClick={handleClick}
          >
            {buttonLabel}
          </Button>
        </Group>
      </div>
    </Card>
  );
}
