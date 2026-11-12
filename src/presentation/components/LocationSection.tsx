import type { WeddingLocation } from "@/src/domain/wedding/types";

interface LocationSectionProps {
  readonly locations: readonly WeddingLocation[];
}

const eventLabels = {
  ceremony: "Cerimonia",
  reception: "Ricevimento",
} as const;

const photoSizes = {
  ceremony: "(min-width: 75rem) 34rem, (min-width: 760px) 48vw, 88vw",
  reception: "(min-width: 75rem) 64rem, 88vw",
} as const;

export function LocationSection({ locations }: LocationSectionProps) {
  return (
    <div id="luogo">
      {locations.map(({ venue, events }) => {
        const isReception = events.length === 1 && events[0].kind === "reception";
        const layout = isReception ? "reception" : "ceremony";
        const titleId = `${layout}-title`;
        const label = events.length > 1 ? "Cerimonia e ricevimento" : isReception ? "Il ricevimento" : "La cerimonia";
        const photo = venue?.photo;

        return (
          <section className={`venue-section venue-section--${layout}`} aria-labelledby={titleId} key={layout}>
            <div className="venue-layout">
              <div className="venue-media">
                {photo ? (
                  <img
                    className="venue-photo"
                    src={photo.src}
                    srcSet={photo.srcSet}
                    sizes={photo.srcSet ? photoSizes[layout] : undefined}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <p className="venue-photo-placeholder">Foto della location da aggiungere.</p>
                )}
              </div>

              <div className="venue-details">
                <header className="venue-heading">
                  <p className="venue-kicker">{label}</p>
                  <h2 className="section-title" id={titleId}>
                    {venue?.displayName ?? venue?.name ?? "Luogo da confermare"}
                  </h2>
                </header>

                <div className="venue-information">
                  <dl className="venue-times">
                    {events.map(event => (
                      <div key={event.kind}>
                        <dt>{events.length === 1 ? "Orario" : eventLabels[event.kind]}</dt>
                        <dd>
                          {event.time ? <time dateTime={event.time}>{event.time}</time> : "Orario da confermare"}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {venue?.address && <address>{venue.address}</address>}

                  {venue?.mapUrl && (
                    <a
                      className="text-link"
                      href={venue.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Indicazioni stradali per ${venue.name} su Google Maps`}
                    >
                      Indicazioni stradali <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
