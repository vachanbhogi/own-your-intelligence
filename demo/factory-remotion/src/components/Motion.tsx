import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SNAP, colors, fonts } from "../lib/theme";

type SpringConfig = {
  damping: number;
  stiffness: number;
  mass: number;
};

export const StageIndex: React.FC<{
  n: string;
  delay?: number;
  /** muted until resolution scenes earn mint */
  tone?: "muted" | "accent";
}> = ({ n, delay = 0, tone = "muted" }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - delay, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        fontFamily: fonts.mono,
        fontSize: 24,
        fontWeight: 500,
        color: tone === "accent" ? colors.accent : colors.muted,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        opacity,
      }}
    >
      {n}
    </div>
  );
};

export const SceneTitle: React.FC<{
  lines: string[];
  delay?: number;
  springConfig?: SpringConfig;
}> = ({ lines, delay = 0, springConfig = SNAP }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ marginTop: 12 }}>
      {lines.map((line, i) => {
        const t = spring({
          frame: frame - (delay + i * 5),
          fps,
          config: springConfig,
        });
        return (
          <div
            key={line}
            style={{
              fontFamily: fonts.sans,
              fontSize: 56,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              color: colors.text,
              opacity: t,
              transform: `translateY(${interpolate(t, [0, 1], [18, 0])}px)`,
            }}
          >
            {line}
          </div>
        );
      })}
    </div>
  );
};

export const VizCaption: React.FC<{
  text: string;
  delay?: number;
}> = ({ text, delay = 10 }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - delay, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return (
    <div
      style={{
        marginTop: 20,
        marginBottom: 16,
        fontFamily: fonts.mono,
        fontSize: 30,
        fontWeight: 500,
        color: colors.muted,
        letterSpacing: "0.04em",
        opacity,
      }}
    >
      {text}
    </div>
  );
};

export const SceneLayout: React.FC<{
  children: React.ReactNode;
  padding?: number;
}> = ({ children, padding = 72 }) => (
  <AbsoluteFill
    style={{
      padding,
      display: "flex",
      flexDirection: "column",
    }}
  >
    {children}
  </AbsoluteFill>
);

export const fadeIn = (frame: number, start: number, dur = 10): number =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
