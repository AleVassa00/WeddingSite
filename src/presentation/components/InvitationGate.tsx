"use client";

import { useCallback, useEffect, useState } from "react";
import type {
  Couple,
  EventDate,
  InvitationGateContent,
} from "@/src/domain/wedding/types";
import { Ampersand } from "./Ampersand";
import { Monogram } from "./Monogram";

const LETTER_READING_TIME_MS = 3000;

interface InvitationGateProps {
  readonly couple: Couple;
  readonly date: EventDate;
  readonly content: InvitationGateContent;
  readonly isOpen: boolean;
  readonly onOpen: () => void;
}

export function InvitationGate({
  couple,
  date,
  content,
  isOpen,
  onOpen,
}: InvitationGateProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isLetterRevealed, setIsLetterRevealed] = useState(false);

  const startOpening = useCallback(() => {
    setIsOpening(true);
  }, []);

  useEffect(() => {
    if (!isLetterRevealed) {
      return;
    }

    const timeout = window.setTimeout(onOpen, LETTER_READING_TIME_MS);

    return () => window.clearTimeout(timeout);
  }, [isLetterRevealed, onOpen]);

  return (
    <section
      className={
        isOpening
          ? "invitation-gate invitation-gate--opening"
          : "invitation-gate"
      }
      aria-hidden={isOpen}
    >
      <div className="gate-grain" />
      <div className="gate-copy">
        <span className="eyebrow">{content.eyebrow}</span>
        <Monogram couple={couple} />
        <p>{date.compact}</p>
      </div>

      <button
        className="envelope"
        type="button"
        onClick={startOpening}
        aria-label={content.openAriaLabel}
        aria-expanded={isOpening || isOpen}
        disabled={isOpening}
      >
        <span className="envelope-shadow" aria-hidden="true" />
        <span className="envelope-back" aria-hidden="true" />
        <span className="envelope-lining" aria-hidden="true" />
        <span
          className="letter"
          onAnimationEnd={() => setIsLetterRevealed(true)}
        >
          <span className="letter-ornament" aria-hidden="true">
            ✦
          </span>
          <small>
            {couple.firstPartner} <Ampersand /> {couple.secondPartner}
          </small>
          <strong>{content.letterTitle}</strong>
          <span className="letter-date">{date.long}</span>
        </span>
        <span className="envelope-front" aria-hidden="true" />
        <span className="envelope-flap" aria-hidden="true" />
        <span className="seal" aria-hidden="true">
          <span className="seal-monogram">
            <span>{couple.initials[0]}</span>
            <Ampersand />
            <span>{couple.initials[1]}</span>
          </span>
        </span>
        <span className="open-label" aria-hidden="true">
          {content.openLabel}
        </span>
      </button>
    </section>
  );
}
