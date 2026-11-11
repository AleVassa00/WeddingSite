import type { WeddingConfig } from "@/src/domain/wedding/types";
import { ENABLE_HERO_PHOTO_BACKGROUND } from "@/src/config/hero-photo-background.config";
import { useInvitationOpening } from "../hooks/useInvitationOpening";
import { CastleHeroPhoto } from "../components/CastleHeroPhoto";
import { GiftsSection } from "../components/GiftsSection";
import { HeroSection } from "../components/HeroSection";
import { InvitationGate } from "../components/InvitationGate";
import { LocationSection } from "../components/LocationSection";
import { WeddingFooter } from "../components/WeddingFooter";
import { WeddingPortrait } from "../components/WeddingPortrait";

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

  const hero = (
    <HeroSection
      couple={config.couple}
      date={config.date}
      datePlaceholder={config.datePlaceholder}
      content={config.hero}
      navigation={config.navigation}
      cardRef={cardRef}
      headingRef={headingRef}
      scrollTarget={config.portrait ? "#foto" : "#luogo"}
    />
  );

  return (
    <main
      className="site"
      data-phase={phase}
      data-opening={motion ? "" : undefined}
      data-castle-hero={ENABLE_HERO_PHOTO_BACKGROUND ? "" : undefined}
      style={motion}
    >
      {!isOpen && (
        <InvitationGate
          couple={config.couple}
          dateLabel={config.date?.compact ?? config.datePlaceholder}
          content={config.gate}
          envelopeRef={envelopeRef}
          isOpening={phase !== "CLOSED"}
          onStart={startOpening}
          onSkip={openImmediately}
        />
      )}
      <div inert={!isOpen}>
        {ENABLE_HERO_PHOTO_BACKGROUND ? (
          <CastleHeroPhoto cardRef={cardRef} isOpen={isOpen}>{hero}</CastleHeroPhoto>
        ) : hero}
        {isOpen && config.portrait && (
          <WeddingPortrait couple={config.couple} date={config.date} photo={config.portrait} />
        )}
        <LocationSection
          locations={config.locations}
          ceremonyStartsAt={isOpen ? config.ceremonyStartsAt : undefined}
        />
        <GiftsSection content={config.gifts} />
        <WeddingFooter couple={config.couple} message={config.farewell} />
      </div>
    </main>
  );
}
