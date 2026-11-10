import { useEffect, useState } from "react";
import { calculateCountdown } from "@/src/domain/wedding/countdown";

export function useCountdown(targetIso: string) {
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1_000);
    return () => window.clearInterval(timer);
  }, []);

  return calculateCountdown(targetIso, now);
}
