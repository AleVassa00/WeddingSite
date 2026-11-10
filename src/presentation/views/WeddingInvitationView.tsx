import { useEffect, useRef, useState } from "react";
import type { AnimationEvent, CSSProperties } from "react";
import type { WeddingConfig } from "@/src/domain/wedding/types";
import { CountdownSection } from "../components/CountdownSection";
import { DetailsSection } from "../components/DetailsSection";
import { HeroSection } from "../components/HeroSection";
import { InvitationGate } from "../components/InvitationGate";
import { LocationSection } from "../components/LocationSection";
import { ProgramSection } from "../components/ProgramSection";
import { StorySection } from "../components/StorySection";
import { WeddingFooter } from "../components/WeddingFooter";

interface WeddingInvitationViewProps {
  readonly config: WeddingConfig;
}

type CardMotion = CSSProperties & {
  readonly "--card-offset-x": string;
  readonly "--card-start-y": string;
  readonly "--card-lift-y": string;
  readonly "--card-scale": number;
  readonly "--card-start-crop": string;
};

function measureCardMotion(envelope: DOMRect, card: DOMRect): CardMotion {
  const scale = Math.min(
    0.8,
    (envelope.width * 0.82) / card.width,
    (envelope.height * 0.78) / card.height,
  );
  const height = card.height * scale;
  const left = envelope.left + (envelope.width - card.width * scale) / 2;
  const startTop = envelope.top + envelope.height * 0.7;
  const liftTop = Math.max(
    card.top * 0.65,
    envelope.top + envelope.height * 0.25 - height * 0.55,
  );
  const hiddenHeight = Math.max(0, startTop + height - envelope.bottom + 2);

  return {
    "--card-offset-x": `${left - card.left}px`,
    "--card-start-y": `${startTop - card.top}px`,
    "--card-lift-y": `${liftTop - card.top}px`,
    "--card-scale": scale,
    "--card-start-crop": `${(hiddenHeight / height) * 100}%`,
  };
}

export function WeddingInvitationView({
  config,
}: WeddingInvitationViewProps) {
  const [isInvitationOpen, setInvitationOpen] = useState(false);
  const [cardMotion, setCardMotion] = useState<CardMotion | null>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (isInvitationOpen) {
      headingRef.current?.focus({ preventScroll: true });
    }
  }, [isInvitationOpen]);

  function startOpening() {
    const envelope = envelopeRef.current;
    const card = cardRef.current;

    if (
      !envelope ||
      !card ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setInvitationOpen(true);
      return;
    }

    setCardMotion(
      measureCardMotion(envelope.getBoundingClientRect(), card.getBoundingClientRect()),
    );
  }

  function finishOpening(event: AnimationEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget && event.animationName === "invitation-card") {
      setInvitationOpen(true);
      setCardMotion(null);
    }
  }

  return (
    <main
      className={isInvitationOpen ? "site is-open" : cardMotion ? "site is-opening" : "site"}
      style={cardMotion ?? undefined}
    >
      {!isInvitationOpen && (
        <InvitationGate
          couple={config.couple}
          date={config.date}
          content={config.gate}
          envelopeRef={envelopeRef}
          isOpening={cardMotion !== null}
          onStart={startOpening}
        />
      )}
      <div inert={!isInvitationOpen}>
        <HeroSection
          couple={config.couple}
          date={config.date}
          content={config.hero}
          navigation={config.navigation}
          cardRef={cardRef}
          headingRef={headingRef}
          onCardAnimationEnd={finishOpening}
        />
        <StorySection couple={config.couple} content={config.story} />
        <CountdownSection
          targetIso={config.date.iso}
          label={config.countdownLabel}
          footer={config.countdownFooter}
        />
        <ProgramSection content={config.program} />
        <LocationSection content={config.venue} />
        <DetailsSection cards={config.details} />
        <WeddingFooter couple={config.couple} content={config.footer} />
      </div>
    </main>
  );
}
