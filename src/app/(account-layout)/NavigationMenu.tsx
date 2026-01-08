"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { memo } from "react";
import clsx from "clsx";

interface NavigationMenuProps {
  navigations: ReadonlyArray<{
    label: string;
    path: string;
  }>;
}

export const NavigationMenu = memo(({ navigations }: NavigationMenuProps) => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {navigations.map((navi) => {
        const isActive = pathname === navi.path;

        return (
          <Link
            key={navi.path}
            href={navi.path}
            className={clsx(
              "relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300",
              "hover:bg-yellow-50 hover:text-yellow-600 hover:translate-x-1",
              isActive
                ? "bg-yellow-100 text-yellow-700 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-yellow-400"
                : "text-gray-700"
            )}
          >
            {navi.label}
          </Link>
        );
      })}
    </nav>
  );
});

NavigationMenu.displayName = "NavigationMenu";
