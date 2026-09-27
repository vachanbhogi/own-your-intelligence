import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  SceneLayout,
  SceneTitle,
  StageIndex,
  VizCaption,
  fadeIn,
} from "../components/Motion";
import { SceneShell } from "../components/SceneShell";
import {
  BRAND,
  SNAP,
  SNAP_SNAPPY,
  SNAP_SOFT,
  colors,
  fonts,
} from "../lib/theme";

/**
 * Order: brand → title → caption → pipeline nodes L→R → hold SHIP.
 * Duration: 120f (4s).
 */
export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const nodes = ["REVIEWS", "SORT", "PRS", "BUILD", "SHIP"];

  return (
    <SceneShell>
      <SceneLayout>
        <StageIndex n={BRAND} tone="muted" />
        <SceneTitle
          lines={["Reviews decide", "what we ship."]}
          springConfig={SNAP_SOFT}
        />
        <VizCaption text="Harmony — agents and humans in sync" delay={28} />
        <div
          style={{
            marginTop: 28,
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 0,
            minHeight: 280,
          }}
        >
          {nodes.map((label, i) => {
            // Light one-by-one: REVIEWS@42 … SHIP@98, then hold to 120
            const start = 42 + i * 14;
            const lit = frame > start;
            const t = spring({
              frame: frame - start,
              fps,
              config: SNAP_SOFT,
            });
            const isShip = i === nodes.length - 1;
            const filled = lit && isShip;
            return (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  flex: 1,
                  opacity: interpolate(t, [0, 1], [0.35, 1]),
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: 160,
                    border: `2px solid ${filled ? colors.accent : colors.borderStrong}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: fonts.mono,
                    fontSize: 26,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    background: filled ? colors.accent : colors.bg,
                    color: filled ? colors.bg : colors.text,
                  }}
                >
                  {label}
                </div>
                {i < nodes.length - 1 ? (
                  <div
                    style={{
                      width: 36,
                      height: 3,
                      background: lit ? colors.borderStrong : colors.border,
                      opacity: fadeIn(frame, start + 4),
                    }}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </SceneLayout>
    </SceneShell>
  );
};

/**
 * Continuous ingest → sort (one motion, no restack).
 * Order: read text → pile once → hold pile → same cards sort → hold themes.
 * Duration: 270f (9s).
 */
export const IngestSortScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const themes = [
    { name: "Dark mode", n: 17, x: 64, y: 200 },
    { name: "Broken export", n: 16, x: 1020, y: 200 },
    { name: "Notifications", n: 16, x: 64, y: 640 },
    { name: "Mobile filters", n: 16, x: 1020, y: 640 },
  ];

  const cards = [
    { text: "Still no dark mode in 2026?!", theme: 0, px: 700, py: 380, rot: -8 },
    { text: "Can't see anything at night", theme: 0, px: 860, py: 320, rot: 5 },
    { text: "Please add dark theme", theme: 0, px: 780, py: 480, rot: -3 },
    { text: "CSV export keeps failing", theme: 1, px: 980, py: 400, rot: 7 },
    { text: "Excel download is empty", theme: 1, px: 900, py: 520, rot: -6 },
    { text: "PDF export broken again", theme: 1, px: 1040, py: 460, rot: 4 },
    { text: "Too many notifications", theme: 2, px: 640, py: 440, rot: 9 },
    { text: "Mute button does nothing", theme: 2, px: 820, py: 560, rot: -4 },
    { text: "Pings all day long", theme: 2, px: 720, py: 500, rot: 2 },
    { text: "No filters on mobile", theme: 3, px: 940, py: 360, rot: -7 },
    { text: "Can't filter on phone", theme: 3, px: 850, py: 440, rot: 6 },
    { text: "Desktop-only filters", theme: 3, px: 760, py: 540, rot: -2 },
  ];

  // 0–45 text · 45–105 pile · 105–125 hold · 125–210 sort · 210–270 hold
  const pilePhase = interpolate(frame, [45, 105], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sortPhase = interpolate(frame, [125, 210], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  const textAlone = fadeIn(frame, 2, 14);
  const textBuried = interpolate(pilePhase, [0.2, 1], [1, 0.18], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sorting = frame >= 125;
  const bucketsVisible = spring({
    frame: frame - 118,
    fps,
    config: SNAP_SOFT,
  });

  const count = Math.floor(
    interpolate(frame, [50, 110], [0, 108], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }),
  );

  return (
    <SceneShell>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 40, left: 64, right: 64, zIndex: 40 }}>
          <StageIndex n={sorting ? "02  ·  SORT AGENT" : "01  ·  INGEST"} />
          <div
            style={{
              marginTop: 8,
              fontFamily: fonts.sans,
              fontSize: 48,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: colors.text,
              opacity: fadeIn(frame, sorting ? 128 : 6, 12),
            }}
          >
            {sorting ? "Noise becomes themes." : "Customers are loud."}
          </div>
          <div
            style={{
              marginTop: 10,
              fontFamily: fonts.mono,
              fontSize: 24,
              color: colors.text,
              opacity: fadeIn(frame, sorting ? 136 : 55, 12),
            }}
          >
            {sorting
              ? "Same reviews — sorted by pain"
              : `${String(count).padStart(3, "0")} Google reviews`}
          </div>
        </div>

        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 120,
            opacity: textAlone * textBuried * (sorting ? 0 : 1),
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              textAlign: "center",
              maxWidth: 1000,
              fontFamily: fonts.sans,
              fontSize: 40,
              fontWeight: 500,
              color: colors.muted,
              lineHeight: 1.4,
              letterSpacing: "-0.02em",
            }}
          >
            Every complaint lands here — unfiltered Google reviews
            of what they hate about the product.
          </div>
        </AbsoluteFill>

        {themes.map((th, i) => (
          <div
            key={th.name}
            style={{
              position: "absolute",
              left: th.x,
              top: th.y,
              width: 820,
              height: 300,
              border: `2px solid ${colors.borderStrong}`,
              background: colors.bgElevated,
              opacity: bucketsVisible * 0.95,
              zIndex: 2,
              padding: 22,
            }}
          >
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 18,
                letterSpacing: "0.12em",
                color: colors.muted,
              }}
            >
              THEME {String(i + 1).padStart(2, "0")}
            </div>
            <div
              style={{
                marginTop: 6,
                fontFamily: fonts.sans,
                fontSize: 40,
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: colors.text,
              }}
            >
              {th.name}
            </div>
            <div
              style={{
                marginTop: 6,
                fontFamily: fonts.mono,
                fontSize: 22,
                color: sortPhase > 0.9 ? colors.accent : colors.muted,
              }}
            >
              {th.n} reviews
            </div>
          </div>
        ))}

        {cards.map((card, i) => {
          const theme = themes[card.theme];
          const slot =
            cards.filter((c, j) => c.theme === card.theme && j <= i).length - 1;
          const endX = theme.x + 24 + (slot % 3) * 24;
          const endY = theme.y + 120 + Math.floor(slot / 3) * 34;

          const drop = spring({
            frame: frame - (48 + i * 5),
            fps,
            config: SNAP_SNAPPY,
          });
          const pileX = card.px;
          const pileY = card.py + interpolate(drop, [0, 1], [-380, 0]);

          const localSort = interpolate(
            sortPhase,
            [i * 0.035, Math.min(1, 0.3 + i * 0.035)],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );

          const x = interpolate(localSort, [0, 1], [pileX, endX]);
          const y = interpolate(localSort, [0, 1], [pileY, endY]);
          const rot = interpolate(localSort, [0, 1], [card.rot, slot % 2 === 0 ? -2 : 2]);

          return (
            <div
              key={card.text}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: 300,
                background: colors.card,
                color: colors.cardText,
                border: `2px solid ${colors.cardText}`,
                padding: "16px 18px",
                boxShadow: "0 14px 32px rgba(0,0,0,0.5)",
                opacity: drop,
                transform: `rotate(${rot}deg)`,
                zIndex: 10 + i,
                fontFamily: fonts.sans,
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.25,
              }}
            >
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 14,
                  letterSpacing: "0.08em",
                  color: colors.cardText,
                  marginBottom: 6,
                }}
              >
                ★★☆☆☆ · Google
              </div>
              “{card.text}”
            </div>
          );
        })}
      </AbsoluteFill>
    </SceneShell>
  );
};

/** @deprecated use IngestSortScene — kept for Studio folder alias */
export const ScrapeScene = IngestSortScene;
/** @deprecated use IngestSortScene */
export const ClusterScene = IngestSortScene;

/**
 * Order: title → caption → bars grow L→R (tallest first readable) → hold.
 * Duration: 135f (4.5s).
 */
export const PickScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const prs = [
    { id: "PR-01", title: "Add dark mode", h: 460, note: "Highest priority" },
    { id: "PR-02", title: "Fix CSV export", h: 380, note: "Priority 2" },
    { id: "PR-03", title: "Mute notifications", h: 300, note: "Priority 3" },
    { id: "PR-04", title: "Mobile filter parity", h: 240, note: "Priority 4" },
  ];

  return (
    <SceneShell>
      <SceneLayout>
        <StageIndex n="03  ·  PICK" />
        <SceneTitle lines={["Fix what", "hurts most."]} />
        <VizCaption text="Candidate PRs ranked by review evidence" delay={26} />
        <div
          style={{
            marginTop: 12,
            flex: 1,
            display: "flex",
            alignItems: "flex-end",
            gap: 20,
            minHeight: 460,
          }}
        >
          {prs.map((pr, i) => {
            // Bars after caption: #1 @38 … #4 @80, then hold to 135
            const t = spring({
              frame: frame - (38 + i * 14),
              fps,
              config: SNAP,
            });
            const h = interpolate(t, [0, 1], [50, pr.h]);
            const top = i === 0;
            return (
              <div
                key={pr.id}
                style={{
                  flex: 1,
                  height: h,
                  border: `2px solid ${top ? colors.accent : colors.borderStrong}`,
                  background: top ? colors.accent : colors.bgElevated,
                  color: top ? colors.bg : colors.text,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: 22,
                  opacity: t,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: fonts.mono,
                      fontSize: 20,
                      letterSpacing: "0.08em",
                      marginBottom: 8,
                      color: top ? colors.bg : colors.muted,
                    }}
                  >
                    {pr.id}
                  </div>
                  <div
                    style={{
                      fontFamily: fonts.sans,
                      fontSize: 30,
                      fontWeight: 700,
                      letterSpacing: "-0.03em",
                      lineHeight: 1.15,
                    }}
                  >
                    {pr.title}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 18,
                    letterSpacing: "0.04em",
                  }}
                >
                  {pr.note}
                </div>
              </div>
            );
          })}
        </div>
      </SceneLayout>
    </SceneShell>
  );
};
