import type { VenueContent } from "@/src/domain/wedding/types";

interface LocationSectionProps {
  readonly content: VenueContent;
}

export function LocationSection({ content }: LocationSectionProps) {
  return (
    <section className="location section-pad" id="luogo">
      <div className="location-art">
        <span className="eyebrow">Fotografia del luogo</span>
        <span>Segnaposto provvisorio</span>
      </div>
      <div className="location-copy">
        <div className="section-number">03</div>
        <span className="eyebrow">{content.eyebrow}</span>
        <h2>
          {content.name[0]}
          <br />
          {content.name[1]}
        </h2>
        <p>
          {content.address.map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <a
          className="text-link"
          href={content.mapUrl}
          target="_blank"
          rel="noreferrer"
        >
          {content.mapLabel} <span>↗</span>
        </a>
      </div>
    </section>
  );
}
