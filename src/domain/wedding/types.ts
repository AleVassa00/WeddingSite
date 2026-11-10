export interface Couple {
  readonly firstPartner: string;
  readonly secondPartner: string;
  readonly initials: readonly [string, string];
}

export interface EventDate {
  readonly iso: string;
  readonly weekday: string;
  readonly day: string;
  readonly monthAndYear: string;
  readonly compact: string;
}

export interface NavigationItem {
  readonly label: string;
  readonly href: `#${string}`;
}

export interface InvitationGateContent {
  readonly eyebrow: string;
  readonly openLabel: string;
  readonly openAriaLabel: string;
}

export interface HeroContent {
  readonly eyebrow: string;
  readonly intro: string;
  readonly scrollLabel: string;
}

export interface StoryContent {
  readonly eyebrow: string;
  readonly title: readonly [string, string];
  readonly paragraphs: readonly string[];
}

export interface ScheduleItem {
  readonly time: string;
  readonly title: string;
  readonly description: string;
}

export interface ProgramContent {
  readonly eyebrow: string;
  readonly title: readonly [string, string];
  readonly description: string;
  readonly items: readonly ScheduleItem[];
}

export interface VenueContent {
  readonly eyebrow: string;
  readonly name: readonly [string, string];
  readonly address: readonly string[];
  readonly mapLabel: string;
  readonly mapUrl: string;
}

export interface DetailCard {
  readonly icon: string;
  readonly eyebrow: string;
  readonly title: readonly [string, string];
  readonly description: string;
  readonly palette?: readonly string[];
}

export interface FooterContent {
  readonly text: string;
  readonly backToTopLabel: string;
}

export interface WeddingSeo {
  readonly title: string;
  readonly description: string;
  readonly socialTitle: string;
  readonly socialDescription: string;
  readonly socialImage?: string;
}

export interface WeddingConfig {
  readonly couple: Couple;
  readonly date: EventDate;
  readonly navigation: readonly NavigationItem[];
  readonly gate: InvitationGateContent;
  readonly hero: HeroContent;
  readonly story: StoryContent;
  readonly countdownLabel: string;
  readonly countdownFooter: string;
  readonly program: ProgramContent;
  readonly venue: VenueContent;
  readonly details: readonly DetailCard[];
  readonly footer: FooterContent;
  readonly seo: WeddingSeo;
}

export interface Countdown {
  readonly giorni: number;
  readonly ore: number;
  readonly minuti: number;
  readonly secondi: number;
}
