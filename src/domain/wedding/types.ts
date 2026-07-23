export type Attendance = "yes" | "no";

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
  readonly long: string;
}

export interface NavigationItem {
  readonly label: string;
  readonly href: `#${string}`;
}

export interface InvitationGateContent {
  readonly eyebrow: string;
  readonly letterTitle: string;
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
  readonly action?: {
    readonly label: string;
    readonly href: string;
  };
  readonly palette?: readonly string[];
}

export interface RsvpContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly deadlineText: string;
  readonly guestOptions: readonly number[];
  readonly shuttleLabel: string;
  readonly storageKey: string;
  readonly successTitle: string;
  readonly successMessage: string;
}

export interface FooterContent {
  readonly text: string;
  readonly backToTopLabel: string;
}

export interface WeddingTheme {
  readonly ivory: string;
  readonly paper: string;
  readonly ink: string;
  readonly sage: string;
  readonly moss: string;
  readonly gold: string;
  readonly blush: string;
  readonly envelopePaper: string;
  readonly envelopeFront: string;
  readonly envelopeBack: string;
  readonly wax: string;
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
  readonly rsvp: RsvpContent;
  readonly footer: FooterContent;
  readonly theme: WeddingTheme;
  readonly seo: WeddingSeo;
}

export interface Countdown {
  readonly giorni: number;
  readonly ore: number;
  readonly minuti: number;
  readonly secondi: number;
}

export interface RsvpSubmission {
  readonly name: string;
  readonly attendance: Attendance;
  readonly guests: number;
  readonly dietaryRequirements: string;
  readonly message: string;
  readonly shuttleRequested: boolean;
  readonly submittedAt: string;
}
