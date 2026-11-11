import { useEffect, useState } from "react";

export function WeddingCountdown({ startsAt }: { readonly startsAt: string }) {
  const deadline = Date.parse(startsAt);
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const currentTime = Date.now();
      setNow(currentTime);
      if (currentTime >= deadline) {
        window.clearInterval(timer);
      }
    }, 1000);

    return () => window.clearInterval(timer);
  }, [deadline]);

  const seconds = Math.max(0, Math.ceil((deadline - now) / 1000));
  const remaining = [
    ["Giorni", Math.floor(seconds / 86400)],
    ["Ore", Math.floor(seconds / 3600) % 24],
    ["Minuti", Math.floor(seconds / 60) % 60],
    ["Secondi", seconds % 60],
  ] as const;

  return (
    <div className="wedding-countdown" role="timer" aria-label="Conto alla rovescia alla cerimonia">
      <span className="eyebrow">Alla cerimonia</span>
      <dl>
        {remaining.map(([unit, value]) => (
          <div key={unit}>
            <dt>{unit}</dt>
            <dd>{String(value).padStart(2, "0")}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
