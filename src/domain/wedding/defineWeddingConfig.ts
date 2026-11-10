import type { WeddingConfig } from "./types";

export function defineWeddingConfig(config: WeddingConfig): WeddingConfig {
  const names = [config.couple.firstPartner, config.couple.secondPartner];

  if (names.some((name) => name.trim().length === 0)) {
    throw new Error("Both partner names are required.");
  }

  if (Number.isNaN(Date.parse(config.date.iso))) {
    throw new Error(`Wedding date is not a valid ISO date: ${config.date.iso}`);
  }

  if (config.navigation.length === 0) {
    throw new Error("At least one navigation item is required.");
  }

  const navigationTargets = new Set(config.navigation.map((item) => item.href));
  if (navigationTargets.size !== config.navigation.length) {
    throw new Error("Navigation targets must be unique.");
  }

  const scheduleTimes = new Set(config.program.items.map((item) => item.time));
  if (scheduleTimes.size !== config.program.items.length) {
    throw new Error("Program times must be unique.");
  }

  return config;
}
