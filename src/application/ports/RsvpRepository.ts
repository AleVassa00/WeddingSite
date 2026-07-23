import type { RsvpSubmission } from "@/src/domain/wedding/types";

export interface RsvpRepository {
  get(): RsvpSubmission | null;
  save(submission: RsvpSubmission): void;
  clear(): void;
}
