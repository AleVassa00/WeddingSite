"use client";

import { useCallback, useEffect, useState } from "react";
import { mapRsvpFormData } from "@/src/application/mappers/mapRsvpFormData";
import type { RsvpRepository } from "@/src/application/ports/RsvpRepository";
import { useCountdown } from "@/src/application/hooks/useCountdown";
import type {
  RsvpSubmission,
  WeddingConfig,
} from "@/src/domain/wedding/types";

export interface WeddingInvitationController {
  readonly isInvitationOpen: boolean;
  readonly countdown: ReturnType<typeof useCountdown>;
  readonly rsvpSubmission: RsvpSubmission | null;
  readonly openInvitation: () => void;
  readonly submitRsvp: (formData: FormData) => void;
  readonly resetRsvp: () => void;
}

export function useWeddingInvitationController(
  config: WeddingConfig,
  rsvpRepository: RsvpRepository,
): WeddingInvitationController {
  const [isInvitationOpen, setInvitationOpen] = useState(false);
  const [rsvpSubmission, setRsvpSubmission] =
    useState<RsvpSubmission | null>(null);
  const countdown = useCountdown(config.date.iso);

  useEffect(() => {
    setRsvpSubmission(rsvpRepository.get());
  }, [rsvpRepository]);

  const openInvitation = useCallback(() => {
    setInvitationOpen(true);
  }, []);

  const submitRsvp = useCallback(
    (formData: FormData) => {
      const submission = mapRsvpFormData(formData);
      rsvpRepository.save(submission);
      setRsvpSubmission(submission);
    },
    [rsvpRepository],
  );

  const resetRsvp = useCallback(() => {
    rsvpRepository.clear();
    setRsvpSubmission(null);
  }, [rsvpRepository]);

  return {
    isInvitationOpen,
    countdown,
    rsvpSubmission,
    openInvitation,
    submitRsvp,
    resetRsvp,
  };
}
