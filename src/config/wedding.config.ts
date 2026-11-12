import { defineWeddingConfig, formatWeddingDate } from "../domain/wedding/defineWeddingConfig";

const couple = {
  firstPartner: "Veronica",
  secondPartner: "Maurizio",
  initials: ["V", "M"],
} as const;

const names = `${couple.firstPartner} & ${couple.secondPartner}`;
const weddingDay = "2027-09-04";
const ceremonyTime = "15:30";
const receptionTime = "18:00";
const datePlaceholder = "Data da confermare";
const date = formatWeddingDate(weddingDay);
const dateLabel = date ? `${date.weekday} ${Number(date.day)} ${date.monthAndYear}` : datePlaceholder;

const ceremonyVenue = mapsVenue(
  "Basilica di Santa Croce in Gerusalemme",
  "Piazza di Santa Croce in Gerusalemme 12, Roma",
);
const receptionVenue = mapsVenue(
  "Castello Rocca dei Cavalieri",
  "Vocabolo Metelli snc, 02030 Collelungo (RI)",
);

function mapsVenue(name: string, address: string) {
  const query = new URLSearchParams({ api: "1", query: `${name}, ${address}` });
  return { name, address, mapUrl: `https://www.google.com/maps/search/?${query}` };
}

export const weddingConfig = defineWeddingConfig({
  couple,
  date,
  datePlaceholder,
  ceremonyStartsAt: `${weddingDay}T${ceremonyTime}:00+02:00`, // Europe/Rome is on summer time on the wedding date.
  navigation: [
    { label: "I luoghi", href: "#luogo" },
    { label: "Regali", href: "#regali" },
    { label: "Saluti", href: "#saluti" },
  ],
  gate: {
    eyebrow: "Un invito speciale",
    openLabel: "Tocca per aprire",
    openAriaLabel: `Apri l’invito di ${couple.firstPartner} e ${couple.secondPartner}`,
  },
  hero: {
    eyebrow: "Partecipazione di nozze",
    phrase: null,
    phrasePlaceholder: "La frase degli sposi sarà aggiunta qui.",
    scrollLabel: "Scopri l’invito",
    photo: null,
    revealPhoto: {
      src: "./photos/tramonto-orizzontale.webp",
      srcSet: "./photos/tramonto-orizzontale-1000.webp 1000w, ./photos/tramonto-orizzontale.webp 1672w",
      alt: `${couple.firstPartner} e ${couple.secondPartner} si baciano in riva al mare al tramonto.`,
      width: 1672,
      height: 941,
    },
  },
  locations: [
    {
      venue: {
        ...ceremonyVenue,
        displayName: "Santa Croce in Gerusalemme",
        photo: {
          src: "./photos/chiesa.webp",
          srcSet: "./photos/chiesa-720.webp 720w, ./photos/chiesa.webp 1200w",
          alt: "La navata della basilica, con la volta affrescata e l’altare sul fondo.",
          width: 1200,
          height: 741,
        },
      },
      events: [{ kind: "ceremony", time: ceremonyTime }],
    },
    {
      venue: {
        ...receptionVenue,
        displayName: "Rocca dei Cavalieri",
        photo: {
          src: "./photos/castello-tramonto.webp",
          srcSet: "./photos/castello-tramonto-800.webp 800w, ./photos/castello-tramonto.webp 1536w",
          alt: "La torre e la piscina del Castello Rocca dei Cavalieri al tramonto.",
          width: 1536,
          height: 1024,
        },
      },
      events: [{ kind: "reception", time: receptionTime }],
    },
  ],
  gifts: {
    intro: "La vostra presenza è il regalo più bello. Se desiderate farci un pensiero, qui troverete le coordinate.",
    beneficiary: null,
    iban: null,
    ibanPlaceholder: "IBAN da comunicare",
  },
  farewell: "Il saluto degli sposi sarà aggiunto qui.",
  seo: {
    title: `${names} — ${dateLabel}`,
    description: `${couple.firstPartner} e ${couple.secondPartner} si sposano ${dateLabel}. Cerimonia alle ${ceremonyTime} alla ${ceremonyVenue.name} a Roma. Ricevimento alle ${receptionTime} al ${receptionVenue.name} a Collelungo (RI).`,
    socialTitle: `${names} — ${dateLabel}`,
    socialDescription: `Un invito a festeggiare insieme ${dateLabel}. Cerimonia alle ${ceremonyTime} a Roma e ricevimento alle ${receptionTime} a Collelungo (RI).`,
  },
});
