import type { Couple, EventDate } from "@/src/domain/wedding/types";
import { Ampersand } from "./Ampersand";

interface WeddingFooterProps {
  readonly couple: Couple;
  readonly date: EventDate | null;
  readonly message: string;
}

export function WeddingFooter({ couple, date, message }: WeddingFooterProps) {
  return (
    <footer className="wedding-footer" id="saluti" aria-labelledby="farewell-title">
      <div className="wedding-farewell">
        <h2 id="farewell-title">
          {couple.firstPartner} <Ampersand /> <em>{couple.secondPartner}</em>
        </h2>
        {date && <time dateTime={date.iso}>{date.day} {date.monthAndYear}</time>}
        <p>{message}</p>
      </div>
    </footer>
  );
}
