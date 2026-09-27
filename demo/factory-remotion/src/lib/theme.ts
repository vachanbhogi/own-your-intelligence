import { loadFont as loadPlexSans } from "@remotion/google-fonts/IBMPlexSans";
import { loadFont as loadPlexMono } from "@remotion/google-fonts/IBMPlexMono";

const sans = loadPlexSans("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const mono = loadPlexMono("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const fonts = {
  sans: sans.fontFamily,
  mono: mono.fontFamily,
};

/** Pure B&W — no mint, no rose */
export const colors = {
  bg: "#000000",
  bgElevated: "#141414",
  border: "#666666",
  borderStrong: "#FFFFFF",
  text: "#FFFFFF",
  muted: "#BBBBBB",
  accent: "#FFFFFF",
  accentSoft: "rgba(255,255,255,0.08)",
  success: "#FFFFFF",
  danger: "#FFFFFF",
  star: "#111111",
  fill: "#FFFFFF",
  card: "#FFFFFF",
  cardText: "#000000",
};

export const SNAP = {
  damping: 22,
  stiffness: 160,
  mass: 0.65,
} as const;

export const SNAP_SNAPPY = {
  damping: 20,
  stiffness: 200,
  mass: 0.55,
} as const;

export const SNAP_SOFT = {
  damping: 26,
  stiffness: 110,
  mass: 0.85,
} as const;

export const VIDEO = {
  width: 1920,
  height: 1080,
  fps: 30,
} as const;

export const SCENE = 90;
export const TRANSITION = 0;

export const BRAND = "HARMONY";
