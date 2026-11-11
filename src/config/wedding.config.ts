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
  ceremonyStartsAt: `${weddingDay}T${ceremonyTime}:00+02:00`, // Ora legale di Roma il giorno del matrimonio.
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
  },
  portrait: {
    src: "./photos/tramonto-ritratto.webp",
    alt: `${couple.firstPartner} e ${couple.secondPartner} si baciano in riva al mare al tramonto.`,
    width: 1200,
    height: 1584,
  },
  locations: [
    {
      venue: ceremonyVenue,
      events: [{ kind: "ceremony", time: ceremonyTime }],
    },
    {
      venue: receptionVenue,
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
