"use client";

import { NavLink } from "@mantine/core";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { memo } from "react";

interface NavigationMenuProps {
  navigations: ReadonlyArray<{
    label: string;
    path: string;
  }>;
}

export const NavigationMenu = memo(({ navigations }: NavigationMenuProps) => {
  const pathname = usePathname();

  return (
    <>
      {navigations.map((navi) => (
        <NavLink
          key={navi.path}
          label={navi.label}
          active={pathname === navi.path}
          component={Link}
          href={navi.path}
        />
      ))}
    </>
  );
});

NavigationMenu.displayName = "NavigationMenu";
