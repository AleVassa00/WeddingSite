import type { Couple } from "@/src/domain/wedding/types";
import { Ampersand } from "./Ampersand";

interface MonogramProps {
  readonly couple: Couple;
  readonly className?: string;
}

export function Monogram({ couple, className = "monogram" }: MonogramProps) {
  return (
    <div
      className={className}
      aria-label={`${couple.initials[0]} e ${couple.initials[1]}`}
    >
      <span>{couple.initials[0]}</span>
      <Ampersand />
      <span>{couple.initials[1]}</span>
    </div>
  );
}
