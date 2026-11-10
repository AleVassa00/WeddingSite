import { defineWeddingConfig, formatWeddingDate } from "../domain/wedding/defineWeddingConfig";

const couple = {
  firstPartner: "Veronica",
  secondPartner: "Maurizio",
  initials: ["V", "M"],
} as const;

const names = `${couple.firstPartner} & ${couple.secondPartner}`;

export const weddingConfig = defineWeddingConfig({
  couple,
  date: formatWeddingDate(null),
  datePlaceholder: "Data da confermare",
  navigation: [
    { label: "Il luogo", href: "#luogo" },
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
  locations: [
    {
      venue: null,
      events: [
        { kind: "ceremony", time: null },
        { kind: "reception", time: null },
      ],
    },
  ],
  gifts: {
    intro: "La vostra presenza è il regalo più bello. Se desiderate farci un pensiero, qui troverete le coordinate.",
    beneficiary: null,
    iban: null,
    ibanPlaceholder: "IBAN da comunicare",
  },
  farewell: "Grazie di cuore per essere parte di questo giorno.",
  seo: {
    title: `${names} — Partecipazione di nozze`,
    description: `La partecipazione di nozze di ${couple.firstPartner} e ${couple.secondPartner}.`,
    socialTitle: `${names} — Ci sposiamo!`,
    socialDescription: "Un invito a festeggiare insieme.",
  },
});
