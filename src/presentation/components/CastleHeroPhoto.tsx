import { useState } from "react";
import type { ReactNode } from "react";

const photoDirectory = `${import.meta.env.BASE_URL}photos/`;

export function CastleHeroPhoto({ children }: { readonly children: ReactNode }) {
  const [photoReady, setPhotoReady] = useState(false);

  return (
    <div className="castle-hero">
      {children}
      <figure className="castle-hero-photo">
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
      </figure>
    </div>
  );
}
