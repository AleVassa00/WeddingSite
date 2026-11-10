import type { Ref } from "react";
import type {
  Couple,
  EventDate,
  HeroContent,
  NavigationItem,
} from "@/src/domain/wedding/types";
import { Ampersand } from "./Ampersand";

interface HeroSectionProps {
  readonly couple: Couple;
  readonly date: EventDate | null;
  readonly datePlaceholder: string;
  readonly content: HeroContent;
  readonly navigation: readonly NavigationItem[];
  readonly cardRef: Ref<HTMLDivElement>;
  readonly headingRef: Ref<HTMLHeadingElement>;
}

export function HeroSection({
  couple,
  date,
  datePlaceholder,
  content,
  navigation,
  cardRef,
  headingRef,
}: HeroSectionProps) {
  return (
    <section className="hero" id="inizio">
      <a className="nav-mark" href="#inizio" aria-label="Torna all’inizio">
        {couple.initials[0]}
        <Ampersand />
        {couple.initials[1]}
      </a>

      <div className="hero-card-frame">
        <div className="hero-center" ref={cardRef}>
          <span className="eyebrow">{content.eyebrow}</span>
          <h1 ref={headingRef} tabIndex={-1}>
            <span>{couple.firstPartner}</span>
            <Ampersand />
            <span>{couple.secondPartner}</span>
          </h1>
          {date ? (
            <time className="hero-date" dateTime={date.iso}>
              <span>{date.weekday}</span>
              <strong>{date.day}</strong>
              <span>{date.monthAndYear}</span>
            </time>
          ) : (
            <p className="hero-date-pending">{datePlaceholder}</p>
          )}
          {content.photo && <img className="hero-photo" src={content.photo.src} alt={content.photo.alt} />}
          <p className="hero-intro">{content.phrase ?? content.phrasePlaceholder}</p>
          <a className="scroll-cue" href="#luogo">
            <span>{content.scrollLabel}</span>
            <i aria-hidden="true">↓</i>
          </a>
        </div>
      </div>
      <nav className="hero-nav" aria-label="Navigazione principale">
        {navigation.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </section>
  );
}
