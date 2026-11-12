export function calculateCountdown(targetIso: string, now: number) {
  const deadline = Date.parse(targetIso);
  if (!Number.isFinite(deadline)) {
    throw new Error(`Data della cerimonia non valida: ${targetIso}`);
  }

  const seconds = Math.max(0, Math.ceil((deadline - now) / 1000));
  return {
    giorni: Math.floor(seconds / 86400),
    ore: Math.floor(seconds / 3600) % 24,
    minuti: Math.floor(seconds / 60) % 60,
    secondi: seconds % 60,
  };
}
