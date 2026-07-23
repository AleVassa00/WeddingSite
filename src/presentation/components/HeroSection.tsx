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
}

export function HeroSection({
  couple,
  date,
  content,
  navigation,
}: HeroSectionProps) {
  const [leftNav, rightNav] = [
    navigation.slice(0, 2),
    navigation.slice(2),
  ];

  return (
    <section className="hero" id="inizio">
      <nav className="hero-nav" aria-label="Navigazione principale">
        {leftNav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
        <a className="nav-mark" href="#inizio" aria-label="Torna all’inizio">
          {couple.initials[0]}
          <Ampersand />
          {couple.initials[1]}
        </a>
        {rightNav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="botanical botanical-left" />
      <div className="botanical botanical-right" />

      <div className="hero-center">
        <span className="eyebrow">{content.eyebrow}</span>
        <h1>
          <span>{couple.firstPartner}</span>
          <Ampersand />
          <span>{couple.secondPartner}</span>
        </h1>
        <p className="hero-intro">{content.intro}</p>
        <div className="hero-date">
          <span>{date.weekday}</span>
          <strong>{date.day}</strong>
          <span>{date.monthAndYear}</span>
        </div>
        <a className="scroll-cue" href="#storia">
          <span>{content.scrollLabel}</span>
          <i>↓</i>
        </a>
      </div>
    </section>
  );
}
