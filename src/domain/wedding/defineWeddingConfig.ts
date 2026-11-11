import { normalizeIban } from "./iban";
import type { EventDate, WeddingConfig } from "./types";

export function formatWeddingDate(iso: string | null): EventDate | null {
  if (iso === null) {
    return null;
  }

  const date = new Date(`${iso}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso) || Number.isNaN(date.getTime()) ||
      date.toISOString().slice(0, 10) !== iso) {
    throw new Error(`Data del matrimonio non valida: ${iso}`);
  }

  const format = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("it-IT", { ...options, timeZone: "UTC" }).format(date);

  return {
    iso,
    weekday: format({ weekday: "long" }),
    day: format({ day: "numeric" }),
    monthAndYear: format({ month: "long", year: "numeric" }),
    compact: format({ day: "2-digit", month: "2-digit", year: "numeric" }).replaceAll("/", " · "),
  };
}

export function defineWeddingConfig(config: WeddingConfig): WeddingConfig {
  const names = [config.couple.firstPartner, config.couple.secondPartner];

  if (names.some((name) => name.trim().length === 0)) {
    throw new Error("Both partner names are required.");
  }

  if (config.navigation.length === 0) {
    throw new Error("At least one navigation item is required.");
  }

  const navigationTargets = new Set(config.navigation.map((item) => item.href));
  if (navigationTargets.size !== config.navigation.length) {
    throw new Error("Navigation targets must be unique.");
  }

  const events = config.locations.flatMap(location => location.events);
  if (
    config.locations.some(location => !location.events.length) ||
    events.length !== 2 ||
    new Set(events.map(event => event.kind)).size !== 2
  ) {
    throw new Error("Configurare una cerimonia e un ricevimento.");
  }

  if (events.some(event => event.time !== null && !/^([01]\d|2[0-3]):[0-5]\d$/.test(event.time))) {
    throw new Error("Gli orari devono usare il formato HH:mm.");
  }

  if (config.ceremonyStartsAt !== undefined && !Number.isFinite(Date.parse(config.ceremonyStartsAt))) {
    throw new Error("La scadenza del countdown deve essere una data valida.");
  }

  for (const { venue } of config.locations) {
    const url = venue?.mapUrl;
    if (url && (!URL.canParse(url) || new URL(url).protocol !== "https:")) {
      throw new Error("Il collegamento a Google Maps deve essere un URL HTTPS.");
    }
  }

  const { iban, beneficiary } = config.gifts;
  if (iban === null) {
    return config;
  }

  const normalizedIban = normalizeIban(iban);
  if (!normalizedIban || !beneficiary?.trim()) {
    throw new Error("Per configurare le coordinate servono un IBAN valido e un intestatario.");
  }

  return { ...config, gifts: { ...config.gifts, iban: normalizedIban } };
}
