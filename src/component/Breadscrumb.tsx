"use client";

import Link from "next/link";
import { Box, Text } from "@mantine/core";
import { IconArrowRight } from "@/type/icon";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <Box className="flex items-center gap-2 text-sm mb-4">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="
                  text-gray-500
                  hover:text-yellow-600
                  transition-colors
                "
              >
                {item.label}
              </Link>
            ) : (
              <Text fw={600} className="text-gray-800">
                {item.label}
              </Text>
            )}

            {!isLast && <IconArrowRight size={14} className="text-gray-400" />}
          </div>
        );
      })}
    </Box>
  );
}
