import { useEffect, useRef, useState } from "react";
import type { ReactNode, RefObject } from "react";

const photoDirectory = `${import.meta.env.BASE_URL}photos/`;

interface CastleHeroPhotoProps {
  readonly children: ReactNode;
  readonly cardRef: RefObject<HTMLDivElement | null>;
  readonly isOpen: boolean;
}

export function CastleHeroPhoto({ children, cardRef, isOpen }: CastleHeroPhotoProps) {
  const [photoReady, setPhotoReady] = useState(false);
  const photoRef = useRef<HTMLElement>(null);
  const captionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const photo = photoRef.current;
    const caption = captionRef.current;
    if (!isOpen || !photoReady || !card || !photo || !caption) {
      return;
    }

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const viewport = window.visualViewport;
    let frame = 0;

    const schedule = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        if (preference.matches) {
          caption.toggleAttribute("data-revealed", true);
          return;
        }

        const stage = photo.getBoundingClientRect();
        const letter = card.getBoundingClientRect();
        const viewportLeft = viewport?.offsetLeft ?? 0;
        const viewportTop = viewport?.offsetTop ?? 0;
        const left = Math.max(viewportLeft, stage.left);
        const top = Math.max(viewportTop, stage.top);
        const right = Math.min(viewportLeft + (viewport?.width ?? window.innerWidth), stage.right);
        const bottom = Math.min(viewportTop + (viewport?.height ?? window.innerHeight), stage.bottom);
        const area = Math.max(0, right - left) * Math.max(0, bottom - top);
        const covered = Math.max(0, Math.min(right, letter.right) - Math.max(left, letter.left)) *
          Math.max(0, Math.min(bottom, letter.bottom) - Math.max(top, letter.top));

        const wasRevealed = caption.hasAttribute("data-revealed");
        // A small difference between entry and exit avoids toggling near the threshold.
        const visible = area > 0 && covered <= area * (wasRevealed ? 0.25 : 0.22) &&
          letter.bottom <= caption.getBoundingClientRect().top;
        if (visible !== wasRevealed) {
          caption.toggleAttribute("data-revealed", visible);
        }
      });
    };

    const observer = new ResizeObserver(schedule);
    observer.observe(card);
    observer.observe(photo);
    observer.observe(caption);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    viewport?.addEventListener("scroll", schedule, { passive: true });
    viewport?.addEventListener("resize", schedule);
    preference.addEventListener("change", schedule);
    schedule();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      viewport?.removeEventListener("scroll", schedule);
      viewport?.removeEventListener("resize", schedule);
      preference.removeEventListener("change", schedule);
      window.cancelAnimationFrame(frame);
    };
  }, [cardRef, isOpen, photoReady]);

  return (
    <div className="castle-hero">
      {children}
      <figure className="castle-hero-photo" ref={photoRef}>
        <picture>
          <source media="(width < 760px)" srcSet={`${photoDirectory}castello-tramonto-mobile.webp`} />
          <img
            src={`${photoDirectory}castello-tramonto.webp`}
            alt="La torre del Castello Rocca dei Cavalieri, la piscina e il paesaggio al tramonto."
            width={1536}
            height={1024}
            decoding="async"
            fetchPriority="low"
            data-ready={photoReady ? "" : undefined}
            onLoad={event => {
              void event.currentTarget.decode().then(() => setPhotoReady(true), () => undefined);
            }}
          />
        </picture>
        <figcaption className="castle-hero-title" ref={captionRef}>
          <p className="castle-hero-title-label">Il ricevimento</p>
          <p className="castle-hero-title-name">Rocca dei Cavalieri</p>
        </figcaption>
      </figure>
    </div>
  );
}
