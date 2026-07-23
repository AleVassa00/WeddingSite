import type { FormEvent } from "react";
import type {
  RsvpContent,
  RsvpSubmission,
} from "@/src/domain/wedding/types";

interface RsvpSectionProps {
  readonly content: RsvpContent;
  readonly submission: RsvpSubmission | null;
  readonly onSubmit: (formData: FormData) => void;
  readonly onReset: () => void;
}

export function RsvpSection({
  content,
  submission,
  onSubmit,
  onReset,
}: RsvpSectionProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(new FormData(event.currentTarget));
  }

  return (
    <section className="rsvp" id="rsvp">
      <div className="rsvp-heading">
        <span className="eyebrow">{content.eyebrow}</span>
        <h2>{content.title}</h2>
        <p>{content.deadlineText}</p>
      </div>

      {submission ? (
        <div className="thank-you" role="status">
          <span>✓</span>
          <h3>{content.successTitle}</h3>
          <p>{content.successMessage}</p>
          <button type="button" onClick={onReset}>
            Modifica risposta
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
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
              <select
                name="guests"
                defaultValue={String(content.guestOptions[0])}
              >
                {content.guestOptions.map((guests) => (
                  <option key={guests} value={guests}>
                    {guests} {guests === 1 ? "ospite" : "ospiti"}
                  </option>
                ))}
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
            <span>{content.shuttleLabel}</span>
          </label>

          <button className="submit-button" type="submit">
            Invia la risposta <span>→</span>
          </button>
        </form>
      )}
    </section>
  );
}
