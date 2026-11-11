import type { Couple, EventDate, WeddingPortraitContent } from "@/src/domain/wedding/types";
import { Ampersand } from "./Ampersand";

interface WeddingPortraitProps {
  readonly couple: Couple;
  readonly date: EventDate | null;
  readonly photo: WeddingPortraitContent;
}

export function WeddingPortrait({ couple, date, photo }: WeddingPortraitProps) {
  return (
    <section className="portrait-section" id="foto" aria-label="Fotografia degli sposi">
      <figure className="portrait-layout">
        <div className="portrait-print">
          <img
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            loading="lazy"
            decoding="async"
          />
        </div>
        <figcaption className="portrait-caption">
          <p>
            {couple.firstPartner} <Ampersand /> <em>{couple.secondPartner}</em>
          </p>
          {date && <time dateTime={date.iso}>{Number(date.day)} {date.monthAndYear}</time>}
        </figcaption>
      </figure>
    </section>
  );
}
