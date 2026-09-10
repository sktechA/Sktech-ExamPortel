/**
 * SKTECH EXAM — Audio Alert & Chime Synthesizer
 * Uses native Web Audio API for offline, latency-free, zero-dependency sound notifications.
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 */

let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  try {
    if (typeof window === 'undefined') return null;
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return null;
    if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
      sharedAudioCtx = new AudioCtx();
    }
    if (sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume().catch(() => {});
    }
    return sharedAudioCtx;
  } catch (e) {
    console.warn('Web Audio Context initialization warning:', e);
    return null;
  }
}

/**
 * 5-Minute Warning Exam Chime
 * Harmonious, authoritative 3-tone chime (E5 -> A5 -> C#6) with warm decay.
 */
export function playExamWarningChime(volume: number = 0.25): boolean {
  try {
    const ctx = getAudioContext();
    if (!ctx) return false;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(Math.min(Math.max(volume, 0.05), 1.0), now);
    masterGain.connect(ctx.destination);

    // Tone triad with harmonic overtone
    const notes = [
      { freq: 659.25, time: 0.0, duration: 0.28 },   // E5
      { freq: 880.00, time: 0.24, duration: 0.32 },  // A5
      { freq: 1108.73, time: 0.50, duration: 0.65 }, // C#6
    ];

    notes.forEach(({ freq, time, duration }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + time);

      // Subtle vibrato / chime shimmer
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(5, now + time);
      lfoGain.gain.setValueAtTime(2.5, now + time);
      lfo.connect(osc.frequency);
      lfo.start(now + time);
      lfo.stop(now + time + duration);

      // Attack and exponential release envelope
      gain.gain.setValueAtTime(0.0001, now + time);
      gain.gain.linearRampToValueAtTime(0.3, now + time + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + time + duration);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(now + time);
      osc.stop(now + time + duration);
    });

    return true;
  } catch (err) {
    console.warn('Unable to play exam warning chime:', err);
    return false;
  }
}

/**
 * Final 60-second urgent pulse tick
 */
export function playFinalMinutePulse(volume: number = 0.2): boolean {
  try {
    const ctx = getAudioContext();
    if (!ctx) return false;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(volume, now);
    masterGain.connect(ctx.destination);

    [0, 0.18].forEach((timeOffset) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, now + timeOffset);

      gain.gain.setValueAtTime(0.0001, now + timeOffset);
      gain.gain.linearRampToValueAtTime(0.25, now + timeOffset + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + timeOffset + 0.12);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(now + timeOffset);
      osc.stop(now + timeOffset + 0.13);
    });

    return true;
  } catch {
    return false;
  }
}
