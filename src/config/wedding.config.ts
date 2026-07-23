import { defineWeddingConfig } from "@/src/domain/wedding/defineWeddingConfig";

export const weddingConfig = defineWeddingConfig({
  couple: {
    firstPartner: "Veronica",
    secondPartner: "Maurizio",
    initials: ["V", "M"],
  },
  date: {
    iso: "2027-09-04T18:00:00+02:00",
    weekday: "Sabato",
    day: "4",
    monthAndYear: "Settembre 2027",
    compact: "04 · 09 · 2027",
    long: "4 settembre 2027",
  },
  navigation: [
    { label: "Noi", href: "#storia" },
    { label: "Programma", href: "#programma" },
    { label: "Il luogo", href: "#luogo" },
    { label: "R.S.V.P.", href: "#rsvp" },
  ],
  gate: {
    eyebrow: "Un invito speciale",
    letterTitle: "Ci sposiamo!",
    openLabel: "Tocca per aprire",
    openAriaLabel: "Apri l’invito di Veronica e Maurizio",
  },
  hero: {
    eyebrow: "Save the date",
    intro:
      "Con gioia, vi invitiamo a celebrare con noi l’inizio della nostra nuova avventura.",
    scrollLabel: "Scopri l’invito",
  },
  story: {
    eyebrow: "La nostra storia",
    title: ["Un incontro.", "Mille destinazioni."],
    paragraphs: [
      "Ci siamo incontrati per caso in una piccola libreria, in un pomeriggio di pioggia. Da allora abbiamo collezionato chilometri, risate e domeniche lente.",
      "Ora siamo pronti per la tappa più bella. E non potremmo immaginarla senza le persone che hanno reso speciale il viaggio fin qui.",
    ],
  },
  countdownLabel: "Manca sempre meno",
  countdownFooter: "al nostro “sì”",
  program: {
    eyebrow: "4 settembre 2027",
    title: ["Il giorno", "più bello"],
    description:
      "Ogni momento è pensato per stare insieme, con calma. Porta con te solo la voglia di festeggiare.",
    items: [
      {
        time: "18:00",
        title: "La cerimonia",
        description:
          "Ci incontriamo nel giardino della villa, tra ulivi e vista sul lago.",
      },
      {
        time: "19:30",
        title: "Il brindisi",
        description:
          "Calici al tramonto, musica dal vivo e piccoli assaggi italiani.",
      },
      {
        time: "21:00",
        title: "La cena",
        description:
          "Una lunga tavolata sotto le stelle, con i sapori che amiamo.",
      },
      {
        time: "23:30",
        title: "La festa",
        description:
          "Scarpe comode, luci accese e pista da ballo fino a tardi.",
      },
    ],
  },
  venue: {
    eyebrow: "La cornice",
    name: ["Villa del", "Balbianello"],
    address: [
      "Via Guido Monzino 1",
      "22016 Tremezzina, Lago di Como",
    ],
    mapLabel: "Apri la mappa",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Villa+del+Balbianello+Lenno",
  },
  details: [
    {
      icon: "✦",
      eyebrow: "Dress code",
      title: ["Elegante,", "con leggerezza"],
      description:
        "Toni naturali, cipria, salvia e blu lago. Evitate, se potete, il bianco e il nero totale.",
      palette: ["#cab8af", "#a6ad94", "#b9c3c3", "#d7c49d"],
    },
    {
      icon: "⌁",
      eyebrow: "Come arrivare",
      title: ["In viaggio,", "senza pensieri"],
      description:
        "Una navetta partirà da Como alle 16:45 e vi riaccompagnerà al termine della festa.",
      action: {
        label: "Prenota il tuo posto",
        href: "#rsvp",
      },
    },
  ],
  rsvp: {
    eyebrow: "Répondez s’il vous plaît",
    title: "Ci sarai?",
    deadlineText: "Conferma la tua presenza entro il 15 luglio 2027.",
    guestOptions: [1, 2, 3, 4],
    shuttleLabel: "Vorrei prenotare la navetta da Como",
    storageKey: "veronica-maurizio:rsvp",
    successTitle: "Grazie, abbiamo ricevuto la tua risposta.",
    successMessage: "Non vediamo l’ora di festeggiare insieme!",
  },
  footer: {
    text: "4 settembre 2027 · Lago di Como",
    backToTopLabel: "Torna su",
  },
  theme: {
    ivory: "#f3efe5",
    paper: "#faf7f0",
    ink: "#1f2b23",
    sage: "#8a9883",
    moss: "#3e5143",
    gold: "#b49969",
    blush: "#d8bdb5",
    envelopePaper: "#788b77",
    envelopeFront: "#667b69",
    envelopeBack: "#536858",
    wax: "#d8c6a4",
  },
  seo: {
    title: "Veronica & Maurizio — 4 settembre 2027",
    description:
      "L’invito al matrimonio di Veronica e Maurizio, a Villa del Balbianello sul Lago di Como.",
    socialTitle: "Veronica & Maurizio — Ci sposiamo!",
    socialDescription:
      "4 settembre 2027 · Villa del Balbianello, Lago di Como",
  },
});
