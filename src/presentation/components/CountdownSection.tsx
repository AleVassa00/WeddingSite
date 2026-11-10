import { useCountdown } from "@/src/application/hooks/useCountdown";

interface CountdownSectionProps {
  readonly targetIso: string;
  readonly label: string;
  readonly footer: string;
}

export function CountdownSection({
  targetIso,
  label,
  footer,
}: CountdownSectionProps) {
  const countdown = useCountdown(targetIso);

  return (
    <section className="countdown-section" aria-label="Conto alla rovescia">
      <span className="eyebrow">{label}</span>
      <div className="countdown">
        {Object.entries(countdown).map(([unit, value]) => (
          <div key={unit}>
            <strong>{String(value).padStart(2, "0")}</strong>
            <span>{unit}</span>
          </div>
        ))}
      </div>
      <p>{footer}</p>
    </section>
  );
}
