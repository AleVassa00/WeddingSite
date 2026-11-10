import type { WeddingConfig } from "@/src/domain/wedding/types";
import { useInvitationOpening } from "../hooks/useInvitationOpening";
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

export function WeddingInvitationView({
  config,
}: WeddingInvitationViewProps) {
  const {
    phase,
    motion,
    isOpen,
    envelopeRef,
    cardRef,
    headingRef,
    startOpening,
    openImmediately,
  } = useInvitationOpening();

  return (
    <main className="site" data-phase={phase} style={motion}>
      {!isOpen && (
        <InvitationGate
          couple={config.couple}
          date={config.date}
          content={config.gate}
          envelopeRef={envelopeRef}
          isOpening={phase !== "CLOSED"}
          onStart={startOpening}
          onSkip={openImmediately}
        />
      )}
      <div inert={!isOpen}>
        <HeroSection
          couple={config.couple}
          date={config.date}
          content={config.hero}
          navigation={config.navigation}
          cardRef={cardRef}
          headingRef={headingRef}
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
