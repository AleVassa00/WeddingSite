import type { Ref } from "react";
import type {
  Couple,
  InvitationGateContent,
} from "@/src/domain/wedding/types";
import { Ampersand } from "./Ampersand";
import { Monogram } from "./Monogram";

interface InvitationGateProps {
  readonly couple: Couple;
  readonly dateLabel: string;
  readonly content: InvitationGateContent;
  readonly envelopeRef: Ref<HTMLDivElement>;
  readonly isOpening: boolean;
  readonly onStart: () => void;
  readonly onSkip: () => void;
}

export function InvitationGate({
  couple,
  dateLabel,
  content,
  envelopeRef,
  isOpening,
  onStart,
  onSkip,
}: InvitationGateProps) {
  return (
    <section className="invitation-gate">
      <div className="gate-backdrop" aria-hidden="true" />
      <div className="gate-copy">
        <span className="eyebrow">{content.eyebrow}</span>
        <Monogram couple={couple} />
        <p>{dateLabel}</p>
      </div>

      <div className="envelope" ref={envelopeRef}>
        <span className="envelope-shadow" aria-hidden="true" />
        <span className="envelope-back" aria-hidden="true" />
        <span className="envelope-lining" aria-hidden="true" />
        <span className="envelope-front" aria-hidden="true">
          <span className="envelope-pocket-paper" />
        </span>
        <span className="envelope-flap-shadow" aria-hidden="true" />
        <span className="envelope-flap envelope-flap--front" aria-hidden="true" />
        <span className="envelope-flap envelope-flap--back" aria-hidden="true" />
        <span className="seal" aria-hidden="true">
          <span className="seal-monogram">
            <span>{couple.initials[0]}</span>
            <Ampersand />
            <span>{couple.initials[1]}</span>
          </span>
        </span>
        <button
          className="envelope-trigger"
          type="button"
          onClick={onStart}
          aria-label={content.openAriaLabel}
          aria-controls="inizio"
          disabled={isOpening}
        >
          <span className="open-label" aria-hidden="true">
            {content.openLabel}
          </span>
        </button>
      </div>
      {isOpening && (
        <button className="skip-intro" type="button" onClick={onSkip}>
          Salta animazione
        </button>
      )}
    </section>
  );
}
