"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageLoading() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
    </div>
  );
}
