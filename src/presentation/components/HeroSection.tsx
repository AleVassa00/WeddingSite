import { useState } from "react";
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
  readonly isOpen: boolean;
  readonly scrollTarget?: "#foto" | "#luogo";
}

export function HeroSection({
  couple,
  date,
  datePlaceholder,
  content,
  navigation,
  cardRef,
  headingRef,
  isOpen,
  scrollTarget = "#luogo",
}: HeroSectionProps) {
  const photo = content.revealPhoto;
  const [readySource, setReadySource] = useState<string>();
  const photoReady = Boolean(photo && readySource === photo.src);
  const showPhoto = isOpen && photoReady;

  return (
    <section
      className={photo ? "hero hero-reveal" : "hero"}
      id="inizio"
      data-show-photo={showPhoto ? "" : undefined}
    >
      {photo && (
        <div className="hero-reveal-media" aria-hidden={!showPhoto}>
          <img
            src={photo.src}
            srcSet={photo.srcSet}
            sizes="(max-width: 480px) 640px, 100vw"
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            decoding="async"
            fetchPriority="low"
            onLoad={event => {
              void event.currentTarget.decode().then(() => setReadySource(photo.src), () => undefined);
            }}
          />
        </div>
      )}
      <a className="nav-mark" href="#inizio" aria-label="Torna all’inizio">
        {couple.initials[0]}
        <Ampersand />
        {couple.initials[1]}
      </a>

      <div className="hero-card-frame">
        <div className="hero-center" ref={cardRef}>
          <div className="hero-copy">
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
            <a className="scroll-cue" href={scrollTarget}>
              <span>{content.scrollLabel}</span>
              <i aria-hidden="true">↓</i>
            </a>
          </div>
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
