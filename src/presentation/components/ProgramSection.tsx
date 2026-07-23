import type { ProgramContent } from "@/src/domain/wedding/types";

interface ProgramSectionProps {
  readonly content: ProgramContent;
}

export function ProgramSection({ content }: ProgramSectionProps) {
  return (
    <section className="program section-pad" id="programma">
      <div className="program-intro">
        <div className="section-number light">02</div>
        <span className="eyebrow">{content.eyebrow}</span>
        <h2>
          {content.title[0]}
          <br />
          {content.title[1]}
        </h2>
        <p>{content.description}</p>
      </div>
      <div className="timeline">
        {content.items.map((item) => (
          <article key={item.time}>
            <time>{item.time}</time>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
