import type { AnimationEventHandler, Ref } from "react";
import type {
  Couple,
  EventDate,
  HeroContent,
  NavigationItem,
} from "@/src/domain/wedding/types";
import { Ampersand } from "./Ampersand";

interface HeroSectionProps {
  readonly couple: Couple;
  readonly date: EventDate;
  readonly content: HeroContent;
  readonly navigation: readonly NavigationItem[];
  readonly cardRef: Ref<HTMLDivElement>;
  readonly headingRef: Ref<HTMLHeadingElement>;
  readonly onCardAnimationEnd: AnimationEventHandler<HTMLDivElement>;
}

export function HeroSection({
  couple,
  date,
  content,
  navigation,
  cardRef,
  headingRef,
  onCardAnimationEnd,
}: HeroSectionProps) {
  return (
    <section className="hero" id="inizio">
      <a className="nav-mark" href="#inizio" aria-label="Torna all’inizio">
        {couple.initials[0]}
        <Ampersand />
        {couple.initials[1]}
      </a>

      <div
        className="hero-center"
        ref={cardRef}
        onAnimationEnd={onCardAnimationEnd}
      >
        <span className="eyebrow">{content.eyebrow}</span>
        <h1 ref={headingRef} tabIndex={-1}>
          <span>{couple.firstPartner}</span>
          <Ampersand />
          <span>{couple.secondPartner}</span>
        </h1>
        <div className="hero-date">
          <span>{date.weekday}</span>
          <strong>{date.day}</strong>
          <span>{date.monthAndYear}</span>
        </div>
        <p className="hero-intro">{content.intro}</p>
        <a className="scroll-cue" href="#storia">
          <span>{content.scrollLabel}</span>
          <i aria-hidden="true">↓</i>
        </a>
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
