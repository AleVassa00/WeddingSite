import { useEffect, useRef, useState } from "react";
import { calculateCountdown } from "@/src/domain/wedding/countdown";
import type { EventDate } from "@/src/domain/wedding/types";

interface WeddingCountdownProps {
  readonly startsAt: string;
  readonly date: EventDate;
}

const ceremonyTimeFormatter = new Intl.DateTimeFormat("it-IT", {
  timeZone: "Europe/Rome",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export function WeddingCountdown({ startsAt, date }: WeddingCountdownProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const deadline = Date.parse(startsAt);
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    let timer: number;

    function schedule() {
      const delay = Math.max(0, Math.min(1000, deadline - Date.now()));
      timer = window.setTimeout(tick, delay);
    }

    function tick() {
      const currentTime = Date.now();
      setNow(currentTime);
      if (currentTime < deadline) schedule();
    }

    schedule();
    return () => window.clearTimeout(timer);
  }, [deadline]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    let depth = 0;
    let previous = 0;

    const update = () => {
      frame = 0;
      // Grow the overlay above the countdown as the page scrolls, keeping its bottom edge on the paper.
      const size = Math.min(depth, Math.max(0, window.scrollY) * 4 / 3);
      if (size === previous) return;
      previous = size;
      section.style.setProperty("--countdown-edge-size", `${size}px`);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const measure = () => {
      depth = Number.parseFloat(getComputedStyle(section, "::before").maxHeight) || 0;
      onScroll();
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { giorni, ore, minuti, secondi } = calculateCountdown(startsAt, now);
  const remaining = [["Giorni", giorni], ["Ore", ore], ["Minuti", minuti], ["Secondi", secondi]] as const;

  return (
    <section ref={sectionRef} className="wedding-countdown" aria-labelledby="wedding-day-title">
      <div className="countdown-content">
        <header className="countdown-heading">
          <h2 className="eyebrow" id="wedding-day-title">Il nostro giorno</h2>
          <time dateTime={date.iso}>{date.day} {date.monthAndYear}</time>
        </header>
        <div role="timer" aria-live="off" aria-label="Conto alla rovescia alla cerimonia">
          <dl className="countdown-units">
            {remaining.map(([unit, value]) => (
              <div key={unit}>
                <dt>{unit}</dt>
                <dd>{String(value).padStart(2, "0")}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="countdown-ceremony">
          Cerimonia alle <time dateTime={startsAt}>{ceremonyTimeFormatter.format(deadline)}</time>
        </p>
      </div>
    </section>
  );
}
