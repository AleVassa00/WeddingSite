"use client";

import { useEffect, useMemo, useState } from "react";
import { calculateCountdown } from "@/src/domain/wedding/countdown";

export function useCountdown(targetIso: string) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 1_000);
    return () => window.clearInterval(timer);
  }, []);

  return useMemo(
    () => calculateCountdown(targetIso, now ?? Date.parse(targetIso)),
    [targetIso, now],
  );
}
