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
  readonly href: "#luogo" | "#regali" | "#saluti";
}

export interface InvitationGateContent {
  readonly eyebrow: string;
  readonly openLabel: string;
  readonly openAriaLabel: string;
}

export interface HeroContent {
  readonly eyebrow: string;
  readonly phrase: string | null;
  readonly phrasePlaceholder: string;
  readonly scrollLabel: string;
  readonly photo: { readonly src: string; readonly alt: string } | null;
}

export interface WeddingLocation {
  readonly venue: {
    readonly name: string;
    readonly address: string;
    readonly mapUrl: string | null;
  } | null;
  readonly events: readonly {
    readonly kind: "ceremony" | "reception";
    readonly time: string | null;
  }[];
}

export interface GiftsContent {
  readonly intro: string;
  readonly beneficiary: string | null;
  readonly iban: string | null;
  readonly ibanPlaceholder: string;
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
  readonly date: EventDate | null;
  readonly datePlaceholder: string;
  readonly navigation: readonly NavigationItem[];
  readonly gate: InvitationGateContent;
  readonly hero: HeroContent;
  readonly locations: readonly WeddingLocation[];
  readonly gifts: GiftsContent;
  readonly farewell: string;
  readonly seo: WeddingSeo;
}
