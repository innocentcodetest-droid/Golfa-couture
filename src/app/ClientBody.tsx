"use client";

import { useEffect } from "react";

export default function ClientBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  // Apply classes to the body after hydration
  useEffect(() => {
    document.body.className = `antialiased ${className || ""}`;
  }, [className]);

  return <body suppressHydrationWarning className={`antialiased ${className || ""}`}>{children}</body>;
}
