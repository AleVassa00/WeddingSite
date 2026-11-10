import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

// These markers follow the end of the lift and the start of the backdrop fade in invitation.css.
const phaseMarkers = [
  { phase: "LETTER_REVEALED", progress: 0.63 },
  { phase: "TRANSITIONING", progress: 0.66 },
] as const;
type ActivePhase = "OPENING" | typeof phaseMarkers[number]["phase"];

type CardMotion = CSSProperties & {
  "--card-offset-x": string;
  "--card-start-y": string;
  "--card-lift-y": string;
  "--card-scale": number;
  "--card-pocket-mask": string;
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
  const offsetX = envelope.left + envelope.width / 2 - (card.left + card.width / 2);
  const startTop = envelope.top + envelope.height * 0.7;
  const liftTop = Math.max(
    card.top * 0.65,
    envelope.top + envelope.height * 0.25 - height * 0.55,
  );
  const frameBottom = cardElement.parentElement?.getBoundingClientRect().bottom ?? card.bottom;

  // The card clears the V-shaped pocket at its corners before scaling up.
  const style = getComputedStyle(envelopeElement);
  const edge = parseFloat(style.getPropertyValue("--pocket-edge")) / 100;
  const point = parseFloat(style.getPropertyValue("--pocket-point")) / 100;
  const pocketTop = envelope.top + envelope.height *
    (edge + (point - edge) * (1 - width / envelope.width));
  const pocketTravel = Math.max(0, liftTop + height + 8 - pocketTop);

  return {
    "--card-offset-x": `${offsetX}px`,
    "--card-start-y": `${startTop - card.top}px`,
    "--card-lift-y": `${liftTop - card.top}px`,
    "--card-scale": scale,
    "--card-pocket-mask": `${frameBottom - envelope.bottom + 2}px`,
    "--envelope-extraction": `${pocketTravel}px`,
  };
}

export function useInvitationOpening() {
  const [state, setState] = useState<OpeningState>({ phase: "CLOSED" });
  const envelopeRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isOpen = state.phase === "OPENED";
  const motion = "motion" in state ? state.motion : undefined;

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
    if (!motion) {
      return;
    }

    const animation = cardRef.current?.getAnimations?.().find(
      item => "animationName" in item && item.animationName === "card-travel",
    );
    const duration = Number(animation?.effect?.getComputedTiming().endTime);
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
    if (!animation || !Number.isFinite(duration) || document.hidden || preference.matches) {
      void Promise.resolve().then(recover);
      return () => { active = false; };
    }

    // The state markers observe the running CSS timeline without replacing its animation.
    let markerIndex = 0;
    let markerTimer: number | undefined;
    const scheduleMarker = () => {
      const marker = phaseMarkers[markerIndex];
      if (!active || !marker) {
        return;
      }
      const remaining = duration * marker.progress - Number(animation.currentTime);
      if (remaining > 0) {
        markerTimer = window.setTimeout(scheduleMarker, Math.max(1, remaining));
        return;
      }
      setState(current => "motion" in current ? { phase: marker.phase, motion } : current);
      markerIndex++;
      scheduleMarker();
    };
    void animation.ready.then(scheduleMarker, recover);
    void animation.finished.then(recover, recover);

    // The promise drives the sequence. This deadline only releases a stalled animation.
    const remaining = duration - Number(animation.currentTime);
    const deadline = window.setTimeout(recover, Math.max(0, remaining) + completionGraceMs);
    window.addEventListener("resize", recover);
    window.addEventListener("pagehide", recover);
    document.addEventListener("visibilitychange", onVisibilityChange);
    preference.addEventListener("change", recover);

    return () => {
      active = false;
      window.clearTimeout(markerTimer);
      window.clearTimeout(deadline);
      window.removeEventListener("resize", recover);
      window.removeEventListener("pagehide", recover);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      preference.removeEventListener("change", recover);
    };
  }, [motion, openImmediately]);

  return {
    phase: state.phase,
    motion,
    isOpen,
    envelopeRef,
    cardRef,
    headingRef,
    startOpening,
    openImmediately,
  };
}
