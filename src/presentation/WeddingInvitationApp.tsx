"use client";

import { useMemo } from "react";
import { useWeddingInvitationController } from "@/src/application/controllers/useWeddingInvitationController";
import type { WeddingConfig } from "@/src/domain/wedding/types";
import { LocalStorageRsvpRepository } from "@/src/infrastructure/rsvp/LocalStorageRsvpRepository";
import { WeddingInvitationView } from "./views/WeddingInvitationView";

interface WeddingInvitationAppProps {
  readonly config: WeddingConfig;
}

export function WeddingInvitationApp({
  config,
}: WeddingInvitationAppProps) {
  const rsvpRepository = useMemo(
    () => new LocalStorageRsvpRepository(config.rsvp.storageKey),
    [config.rsvp.storageKey],
  );
  const controller = useWeddingInvitationController(config, rsvpRepository);

  return (
    <WeddingInvitationView config={config} controller={controller} />
  );
}
