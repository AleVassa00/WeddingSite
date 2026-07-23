import type { Countdown } from "./types";

const MILLISECONDS = {
  second: 1_000,
  minute: 60_000,
  hour: 3_600_000,
  day: 86_400_000,
} as const;

export function calculateCountdown(targetIso: string, now: number): Countdown {
  const target = Date.parse(targetIso);

  if (Number.isNaN(target)) {
    throw new Error(`Invalid wedding date: ${targetIso}`);
  }

  const distance = Math.max(0, target - now);

  return {
    giorni: Math.floor(distance / MILLISECONDS.day),
    ore: Math.floor((distance / MILLISECONDS.hour) % 24),
    minuti: Math.floor((distance / MILLISECONDS.minute) % 60),
    secondi: Math.floor((distance / MILLISECONDS.second) % 60),
  };
}
