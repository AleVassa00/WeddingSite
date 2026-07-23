import type { DetailCard } from "@/src/domain/wedding/types";

interface DetailsSectionProps {
  readonly cards: readonly DetailCard[];
}

export function DetailsSection({ cards }: DetailsSectionProps) {
  return (
    <section className="details section-pad">
      {cards.map((card) => (
        <article key={card.eyebrow}>
          <span className="detail-icon">{card.icon}</span>
          <span className="eyebrow">{card.eyebrow}</span>
          <h3>
            {card.title[0]}
            <br />
            {card.title[1]}
          </h3>
          <p>{card.description}</p>

          {card.palette ? (
            <div className="swatches" aria-label="Palette suggerita">
              {card.palette.map((color) => (
                <i key={color} style={{ backgroundColor: color }} />
              ))}
            </div>
          ) : null}

          {card.action ? (
            <a className="text-link" href={card.action.href}>
              {card.action.label} <span>↓</span>
            </a>
          ) : null}
        </article>
      ))}
    </section>
  );
}
