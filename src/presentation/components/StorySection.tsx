import type { Couple, StoryContent } from "@/src/domain/wedding/types";
import { Ampersand } from "./Ampersand";

interface StorySectionProps {
  readonly couple: Couple;
  readonly content: StoryContent;
}

export function StorySection({ couple, content }: StorySectionProps) {
  return (
    <section className="story section-pad" id="storia">
      <div className="section-number">01</div>
      <div className="story-title">
        <span className="eyebrow">{content.eyebrow}</span>
        <h2>
          {content.title[0]}
          <br />
          {content.title[1]}
        </h2>
      </div>
      <div className="story-copy">
        {content.paragraphs.map((paragraph, index) => (
          <p className={index === 0 ? "dropcap" : undefined} key={paragraph}>
            {paragraph}
          </p>
        ))}
        <div className="signature">
          {couple.firstPartner} <Ampersand /> {couple.secondPartner}
        </div>
      </div>
    </section>
  );
}
