import type { WeddingLocation } from "@/src/domain/wedding/types";
import { WeddingCountdown } from "./WeddingCountdown";

interface LocationSectionProps {
  readonly locations: readonly WeddingLocation[];
  readonly ceremonyStartsAt?: string;
}

const eventLabels = {
  ceremony: "Cerimonia",
  reception: "Ricevimento",
} as const;

export function LocationSection({ locations, ceremonyStartsAt }: LocationSectionProps) {
  return (
    <section className="invitation-section celebration" id="luogo" aria-labelledby="celebration-title">
      <header className="invitation-section-heading">
        <span className="eyebrow">Il giorno</span>
        <h2 id="celebration-title">Cerimonia e ricevimento</h2>
      </header>

      {ceremonyStartsAt && <WeddingCountdown startsAt={ceremonyStartsAt} />}

      <div className="venue-list">
        {locations.map(({ venue, events }) => (
          <article className="venue-entry" key={events[0].kind}>
            {venue?.photo && (
              <img
                className="venue-photo"
                src={venue.photo.src}
                alt={venue.photo.alt}
                width={venue.photo.width}
                height={venue.photo.height}
                loading="lazy"
                decoding="async"
              />
            )}
            <div className="venue-details">
              <h3>{venue?.name ?? "Luogo da confermare"}</h3>
              {venue?.address && <address>{venue.address}</address>}

              <dl className="venue-times">
                {events.map(event => (
                  <div key={event.kind}>
                    <dt>{eventLabels[event.kind]}</dt>
                    <dd>
                      {event.time ? <time dateTime={event.time}>{event.time}</time> : "Orario da confermare"}
                    </dd>
                  </div>
                ))}
              </dl>

              {venue?.mapUrl && (
                <a
                  className="text-link"
                  href={venue.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Apri in Google Maps: ${venue.name}`}
                >
                  Apri in Google Maps <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
