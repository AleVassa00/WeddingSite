import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const stages = {
  OPENING: { animation: "card-extract", next: "LETTER_REVEALED" },
  LETTER_REVEALED: { animation: "card-revealed", next: "TRANSITIONING" },
  TRANSITIONING: { animation: "card-settle", next: "OPENED" },
} as const;

type ActivePhase = keyof typeof stages;

type CardMotion = CSSProperties & {
  "--card-offset-x": string;
  "--card-start-y": string;
  "--card-lift-y": string;
  "--card-scale": number;
  "--card-start-crop": string;
  "--envelope-extraction": string;
};

type OpeningState =
  | { phase: "CLOSED" | "OPENED" }
  | { phase: ActivePhase; motion: CardMotion };

const motionPreference = "(prefers-reduced-motion: reduce)";
const completionGraceMs = 200;

function measureCardMotion(envelopeElement: HTMLElement, cardElement: HTMLElement): CardMotion {
  const envelope = envelopeElement.getBoundingClientRect();
  const card = cardElement.getBoundingClientRect();
  const scale = Math.min(
    0.8,
    (envelope.width * 0.82) / card.width,
    (envelope.height * 0.78) / card.height,
  );
  const width = card.width * scale;
  const height = card.height * scale;
  const left = envelope.left + (envelope.width - width) / 2;
  const startTop = envelope.top + envelope.height * 0.7;
  const liftTop = Math.max(
    card.top * 0.65,
    envelope.top + envelope.height * 0.25 - height * 0.55,
  );
  const hiddenHeight = Math.max(0, startTop + height - envelope.bottom + 2);

  // The card clears the V-shaped pocket at its corners before scaling up.
  const style = getComputedStyle(envelopeElement);
  const edge = parseFloat(style.getPropertyValue("--pocket-edge")) / 100;
  const point = parseFloat(style.getPropertyValue("--pocket-point")) / 100;
  const pocketTop = envelope.top + envelope.height *
    (edge + (point - edge) * (1 - width / envelope.width));
  const pocketTravel = Math.max(0, liftTop + height + 8 - pocketTop);

  return {
    "--card-offset-x": `${left - card.left}px`,
    "--card-start-y": `${startTop - card.top}px`,
    "--card-lift-y": `${liftTop - card.top}px`,
    "--card-scale": scale,
    "--card-start-crop": `${(hiddenHeight / height) * 100}%`,
    "--envelope-extraction": `${pocketTravel}px`,
  };
}

export function useInvitationOpening() {
  const [state, setState] = useState<OpeningState>({ phase: "CLOSED" });
  const envelopeRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isOpen = state.phase === "OPENED";

  const openImmediately = useCallback(() => {
    setState(current => current.phase === "OPENED" ? current : { phase: "OPENED" });
  }, []);

  function startOpening() {
    if (state.phase !== "CLOSED") {
      return;
    }

    const envelope = envelopeRef.current;
    const card = cardRef.current;
    if (!envelope || !card || window.matchMedia(motionPreference).matches) {
      openImmediately();
      return;
    }

    const motion = measureCardMotion(envelope, card);
    setState(current => current.phase === "CLOSED" ? { phase: "OPENING", motion } : current);
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    // Let the browser paint the page after removing inert before moving focus.
    let frame = window.requestAnimationFrame(() => {
      frame = window.requestAnimationFrame(() => {
        headingRef.current?.focus({ preventScroll: true });
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [isOpen]);

  useEffect(() => {
    if (!("motion" in state)) {
      return;
    }

    const { animation: animationName, next } = stages[state.phase];
    const nextState: OpeningState =
      next === "OPENED" ? { phase: next } : { phase: next, motion: state.motion };
    const animation = cardRef.current?.getAnimations?.().find(
      item => "animationName" in item && item.animationName === animationName,
    );
    const endTime = animation?.effect?.getComputedTiming().endTime;
    let active = true;

    function recover() {
      if (active) {
        openImmediately();
      }
    }

    function onVisibilityChange() {
      if (document.hidden) {
        recover();
      }
    }

    const preference = window.matchMedia(motionPreference);
    if (!animation || !Number.isFinite(endTime) || document.hidden || preference.matches) {
      void Promise.resolve().then(recover);
      return () => { active = false; };
    }

    void animation.finished.then(() => {
      if (active) {
        setState(current => current.phase === state.phase ? nextState : current);
      }
    }, recover);

    // The promise drives the sequence. This deadline only releases a stalled animation.
    const remaining = Number(endTime) - Number(animation.currentTime);
    const deadline = window.setTimeout(recover, Math.max(0, remaining) + completionGraceMs);
    window.addEventListener("resize", recover);
    window.addEventListener("pagehide", recover);
    document.addEventListener("visibilitychange", onVisibilityChange);
    preference.addEventListener("change", recover);

    return () => {
      active = false;
      window.clearTimeout(deadline);
      window.removeEventListener("resize", recover);
      window.removeEventListener("pagehide", recover);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      preference.removeEventListener("change", recover);
    };
  }, [state, openImmediately]);

  return {
    phase: state.phase,
    motion: "motion" in state ? state.motion : undefined,
    isOpen,
    envelopeRef,
    cardRef,
    headingRef,
    startOpening,
    openImmediately,
  };
}
