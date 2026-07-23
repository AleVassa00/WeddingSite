import type { WeddingInvitationController } from "@/src/application/controllers/useWeddingInvitationController";
import type { WeddingConfig } from "@/src/domain/wedding/types";
import { toCssVariables } from "@/src/presentation/theme/toCssVariables";
import { CountdownSection } from "../components/CountdownSection";
import { DetailsSection } from "../components/DetailsSection";
import { HeroSection } from "../components/HeroSection";
import { InvitationGate } from "../components/InvitationGate";
import { LocationSection } from "../components/LocationSection";
import { ProgramSection } from "../components/ProgramSection";
import { RsvpSection } from "../components/RsvpSection";
import { StorySection } from "../components/StorySection";
import { WeddingFooter } from "../components/WeddingFooter";

interface WeddingInvitationViewProps {
  readonly config: WeddingConfig;
  readonly controller: WeddingInvitationController;
}

export function WeddingInvitationView({
  config,
  controller,
}: WeddingInvitationViewProps) {
  return (
    <main
      className={controller.isInvitationOpen ? "site is-open" : "site"}
      style={toCssVariables(config.theme)}
    >
      <InvitationGate
        couple={config.couple}
        date={config.date}
        content={config.gate}
        isOpen={controller.isInvitationOpen}
        onOpen={controller.openInvitation}
      />
      <HeroSection
        couple={config.couple}
        date={config.date}
        content={config.hero}
        navigation={config.navigation}
      />
      <StorySection couple={config.couple} content={config.story} />
      <CountdownSection
        countdown={controller.countdown}
        label={config.countdownLabel}
        footer={config.countdownFooter}
      />
      <ProgramSection content={config.program} />
      <LocationSection content={config.venue} />
      <DetailsSection cards={config.details} />
      <RsvpSection
        content={config.rsvp}
        submission={controller.rsvpSubmission}
        onSubmit={controller.submitRsvp}
        onReset={controller.resetRsvp}
      />
      <WeddingFooter couple={config.couple} content={config.footer} />
    </main>
  );
}
