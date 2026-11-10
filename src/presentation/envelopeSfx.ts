const soundFiles = {
  seal: "seal-release.wav",
  flap: "envelope-flap.wav",
  card: "card-extraction.wav",
};

const maxCueDelaySeconds = 0.075;

function keyframeTime(animation: Animation | undefined, index: number) {
  const effect = animation?.effect;
  if (!(effect instanceof KeyframeEffect)) {
    return NaN;
  }

  const timing = effect.getComputedTiming();
  const offset = effect.getKeyframes()[index]?.computedOffset ?? NaN;
  return (timing.delay ?? 0) + Number(timing.duration) * offset;
}

export function prepareEnvelopeSfx() {
  if (!window.AudioContext) {
    return undefined;
  }

  const controller = new AbortController();
  const load = (file: string) => fetch(`${import.meta.env.BASE_URL}audio/${file}`, {
    signal: controller.signal,
  })
    .then(response => response.ok ? response.arrayBuffer() : undefined)
    .catch(() => undefined);
  const seal = load(soundFiles.seal);
  const flap = load(soundFiles.flap);
  const card = load(soundFiles.card);

  let context: AudioContext | undefined;
  let output: GainNode | undefined;
  let resumed: Promise<boolean> | undefined;

  function stop() {
    controller.abort();
    output?.disconnect();
    if (context) {
      void context.close().catch(() => undefined);
      context = undefined;
    }
  }

  function unlock() {
    if (context || controller.signal.aborted) {
      return;
    }

    try {
      // Keep resume inside the trusted click, including activation by keyboard.
      context = new AudioContext();
      output = context.createGain();
      output.connect(context.destination);
      resumed = context.resume().then(() => true, () => false);
    } catch {
      stop();
    }
  }

  function schedule(envelope: HTMLElement, motion: Animation) {
    const audio = context;
    const destination = output;
    if (!audio || !destination) {
      return;
    }

    const animations = envelope.getAnimations({ subtree: true });
    const find = (name: string) => animations.find(
      item => "animationName" in item && item.animationName === name,
    );
    const cues = [
      { file: seal, time: keyframeTime(find("seal-release"), 1) },
      { file: flap, time: keyframeTime(find("flap-turn-front"), 0) },
      { file: card, time: keyframeTime(motion, 1) },
    ];

    for (const { file, time } of cues) {
      if (!Number.isFinite(time)) {
        continue;
      }

      const decoded = file.then(bytes => bytes && !controller.signal.aborted
        ? audio.decodeAudioData(bytes)
        : undefined);
      void Promise.all([resumed, decoded]).then(([allowed, buffer]) => {
        if (!allowed || !buffer || controller.signal.aborted || audio.state !== "running") {
          return;
        }

        // Follow the visual clock and drop cues that miss their playback window.
        const remaining = (time - Number(motion.currentTime)) / 1000;
        if (remaining < -maxCueDelaySeconds) {
          return;
        }

        const source = audio.createBufferSource();
        source.buffer = buffer;
        source.connect(destination);
        source.start(audio.currentTime + Math.max(0, remaining), Math.max(0, -remaining));
      }).catch(() => undefined);
    }
  }

  return { unlock, schedule, stop };
}
