import type { RsvpRepository } from "@/src/application/ports/RsvpRepository";
import type { RsvpSubmission } from "@/src/domain/wedding/types";

export class LocalStorageRsvpRepository implements RsvpRepository {
  constructor(private readonly storageKey: string) {}

  get(): RsvpSubmission | null {
    const serialized = window.localStorage.getItem(this.storageKey);
    if (!serialized) {
      return null;
    }

    try {
      return JSON.parse(serialized) as RsvpSubmission;
    } catch {
      this.clear();
      return null;
    }
  }

  save(submission: RsvpSubmission): void {
    window.localStorage.setItem(this.storageKey, JSON.stringify(submission));
  }

  clear(): void {
    window.localStorage.removeItem(this.storageKey);
  }
}
