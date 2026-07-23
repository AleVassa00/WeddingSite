"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

const weddingDate = new Date("2027-06-14T16:30:00+02:00");

function useCountdown() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return useMemo(() => {
    const distance = Math.max(0, weddingDate.getTime() - now);
    return {
      giorni: Math.floor(distance / 86_400_000),
      ore: Math.floor((distance / 3_600_000) % 24),
      minuti: Math.floor((distance / 60_000) % 60),
      secondi: Math.floor((distance / 1000) % 60),
    };
  }, [now]);
}

const schedule = [
  {
    time: "16:30",
    title: "La cerimonia",
    text: "Ci incontriamo nel giardino della villa, tra ulivi e vista sul lago.",
  },
  {
    time: "18:00",
    title: "Il brindisi",
    text: "Calici al tramonto, musica dal vivo e piccoli assaggi italiani.",
  },
  {
    time: "20:00",
    title: "La cena",
    text: "Una lunga tavolata sotto le stelle, con i sapori che amiamo.",
  },
  {
    time: "23:00",
    title: "La festa",
    text: "Scarpe comode, luci accese e pista da ballo fino a tardi.",
  },
];

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [sent, setSent] = useState(false);
  const countdown = useCountdown();

  function submitRsvp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <main className={opened ? "site is-open" : "site"}>
      <section className="invitation-gate" aria-hidden={opened}>
        <div className="gate-grain" />
        <div className="gate-copy">
          <span className="eyebrow">Un invito speciale</span>
          <div className="monogram" aria-label="S e L">
            <span>S</span>
            <i>&amp;</i>
            <span>L</span>
          </div>
          <p>14 · 06 · 2027</p>
        </div>

        <button
          className="envelope"
          type="button"
          onClick={() => setOpened(true)}
          aria-label="Apri l’invito di Sofia e Lorenzo"
        >
          <span className="envelope-back" />
          <span className="letter">
            <small>Sofia &amp; Lorenzo</small>
            <strong>Ci sposiamo!</strong>
          </span>
          <span className="envelope-front" />
          <span className="envelope-flap" />
          <span className="seal">SL</span>
        </button>

        <button
          className="open-label"
          type="button"
          onClick={() => setOpened(true)}
        >
          Tocca per aprire
        </button>
      </section>

      <section className="hero" id="inizio">
        <nav className="hero-nav" aria-label="Navigazione principale">
          <a href="#storia">Noi</a>
          <a href="#programma">Programma</a>
          <a className="nav-mark" href="#inizio" aria-label="Torna all’inizio">
            S<span>&amp;</span>L
          </a>
          <a href="#luogo">Il luogo</a>
          <a href="#rsvp">R.S.V.P.</a>
        </nav>

        <div className="botanical botanical-left" />
        <div className="botanical botanical-right" />

        <div className="hero-center">
          <span className="eyebrow">Save the date</span>
          <h1>
            <span>Sofia</span>
            <i>&amp;</i>
            <span>Lorenzo</span>
          </h1>
          <p className="hero-intro">
            Con gioia, vi invitiamo a celebrare con noi
            <br /> l’inizio della nostra nuova avventura.
          </p>
          <div className="hero-date">
            <span>Lunedì</span>
            <strong>14</strong>
            <span>Giugno 2027</span>
          </div>
          <a className="scroll-cue" href="#storia">
            <span>Scopri l’invito</span>
            <i>↓</i>
          </a>
        </div>
      </section>

      <section className="story section-pad" id="storia">
        <div className="section-number">01</div>
        <div className="story-title">
          <span className="eyebrow">La nostra storia</span>
          <h2>Un incontro.<br />Mille destinazioni.</h2>
        </div>
        <div className="story-copy">
          <p className="dropcap">
            Ci siamo incontrati per caso in una piccola libreria, in un
            pomeriggio di pioggia. Da allora abbiamo collezionato chilometri,
            risate e domeniche lente.
          </p>
          <p>
            Ora siamo pronti per la tappa più bella. E non potremmo immaginarla
            senza le persone che hanno reso speciale il viaggio fin qui.
          </p>
          <div className="signature">Sofia &amp; Lorenzo</div>
        </div>
      </section>

      <section className="countdown-section" aria-label="Conto alla rovescia">
        <span className="eyebrow">Manca sempre meno</span>
        <div className="countdown">
          {Object.entries(countdown).map(([label, value]) => (
            <div key={label}>
              <strong>{String(value).padStart(2, "0")}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <p>al nostro “sì”</p>
      </section>

      <section className="program section-pad" id="programma">
        <div className="program-intro">
          <div className="section-number light">02</div>
          <span className="eyebrow">14 giugno 2027</span>
          <h2>Il giorno<br />più bello</h2>
          <p>
            Ogni momento è pensato per stare insieme, con calma. Porta con te
            solo la voglia di festeggiare.
          </p>
        </div>
        <div className="timeline">
          {schedule.map((item) => (
            <article key={item.time}>
              <time>{item.time}</time>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="location section-pad" id="luogo">
        <div className="location-art" aria-hidden="true">
          <span className="sun" />
          <span className="mountain mountain-one" />
          <span className="mountain mountain-two" />
          <span className="lake-line" />
          <div className="villa">
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="location-copy">
          <div className="section-number">03</div>
          <span className="eyebrow">La cornice</span>
          <h2>Villa del<br />Balbianello</h2>
          <p>
            Via Guido Monzino 1
            <br />
            22016 Tremezzina, Lago di Como
          </p>
          <a
            className="text-link"
            href="https://www.google.com/maps/search/?api=1&query=Villa+del+Balbianello+Lenno"
            target="_blank"
            rel="noreferrer"
          >
            Apri la mappa <span>↗</span>
          </a>
        </div>
      </section>

      <section className="details section-pad">
        <article>
          <span className="detail-icon">✦</span>
          <span className="eyebrow">Dress code</span>
          <h3>Elegante,<br />con leggerezza</h3>
          <p>
            Toni naturali, cipria, salvia e blu lago. Evitate, se potete, il
            bianco e il nero totale.
          </p>
          <div className="swatches" aria-label="Palette suggerita">
            <i className="swatch-one" />
            <i className="swatch-two" />
            <i className="swatch-three" />
            <i className="swatch-four" />
          </div>
        </article>
        <article>
          <span className="detail-icon">⌁</span>
          <span className="eyebrow">Come arrivare</span>
          <h3>In viaggio,<br />senza pensieri</h3>
          <p>
            Una navetta partirà da Como alle 15:15 e vi riaccompagnerà al
            termine della festa.
          </p>
          <a className="text-link" href="#rsvp">
            Prenota il tuo posto <span>↓</span>
          </a>
        </article>
      </section>

      <section className="rsvp" id="rsvp">
        <div className="rsvp-heading">
          <span className="eyebrow">Répondez s’il vous plaît</span>
          <h2>Ci sarai?</h2>
          <p>Conferma la tua presenza entro il 15 aprile 2027.</p>
        </div>

        {sent ? (
          <div className="thank-you" role="status">
            <span>✓</span>
            <h3>Grazie, abbiamo ricevuto la tua risposta.</h3>
            <p>Non vediamo l’ora di festeggiare insieme!</p>
            <button type="button" onClick={() => setSent(false)}>
              Modifica risposta
            </button>
          </div>
        ) : (
          <form onSubmit={submitRsvp}>
            <label>
              Nome e cognome
              <input name="name" type="text" required placeholder="Il tuo nome" />
            </label>

            <fieldset>
              <legend>Potrai essere con noi?</legend>
              <label className="radio-card">
                <input type="radio" name="attendance" value="yes" required />
                <span>Sì, con gioia!</span>
              </label>
              <label className="radio-card">
                <input type="radio" name="attendance" value="no" required />
                <span>Purtroppo no</span>
              </label>
            </fieldset>

            <div className="form-row">
              <label>
                Numero di ospiti
                <select name="guests" defaultValue="1">
                  <option value="1">1 ospite</option>
                  <option value="2">2 ospiti</option>
                  <option value="3">3 ospiti</option>
                  <option value="4">4 ospiti</option>
                </select>
              </label>
              <label>
                Esigenze alimentari
                <input
                  name="diet"
                  type="text"
                  placeholder="Allergie o preferenze"
                />
              </label>
            </div>

            <label>
              Un messaggio per gli sposi
              <textarea name="message" rows={3} placeholder="Scrivi qui…" />
            </label>

            <label className="shuttle-check">
              <input name="shuttle" type="checkbox" />
              <span>Vorrei prenotare la navetta da Como</span>
            </label>

            <button className="submit-button" type="submit">
              Invia la risposta <span>→</span>
            </button>
          </form>
        )}
      </section>

      <footer>
        <div className="footer-mark">
          <span>S</span>
          <i>&amp;</i>
          <span>L</span>
        </div>
        <p>14 giugno 2027 · Lago di Como</p>
        <a href="#inizio">Torna su ↑</a>
      </footer>
    </main>
  );
}
