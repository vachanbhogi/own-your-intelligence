import {
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
import { SNAP, SNAP_SNAPPY, SNAP_SOFT, colors, fonts } from "../lib/theme";

/**
 * Order: title → caption → quote alone → checklist 1→4 → hold.
 * Duration: 150f (5s).
 */
export const PmScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const items = [
    { label: "Problem", detail: "No dark mode" },
    { label: "Why now", detail: "17 review complaints" },
    { label: "Acceptance", detail: "Theme toggle + persist" },
    { label: "Evidence", detail: "Quotes linked in spec" },
  ];

  return (
    <SceneShell>
      <SceneLayout>
        <StageIndex n="04  ·  DESIGNER / PM" />
        <SceneTitle lines={["Spec from", "the quotes."]} springConfig={SNAP_SOFT} />
        <VizCaption text="PM writes the why before eng writes code" delay={26} />

        <div
          style={{
            marginTop: 8,
            flex: 1,
            display: "flex",
            gap: 40,
            minHeight: 480,
          }}
        >
          <div
            style={{
              flex: 1,
              background: colors.card,
              color: colors.cardText,
              border: `3px solid ${colors.cardText}`,
              padding: 40,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              opacity: fadeIn(frame, 32, 16),
            }}
          >
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 20,
                letterSpacing: "0.12em",
                color: "#111111",
                marginBottom: 20,
              }}
            >
              ★ GOOGLE REVIEW
            </div>
            <div
              style={{
                fontFamily: fonts.sans,
                fontSize: 48,
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1.2,
              }}
            >
              “Still no dark mode in 2026?!”
            </div>
            <div
              style={{
                marginTop: 28,
                fontFamily: fonts.mono,
                fontSize: 22,
                color: "#3A403C",
              }}
            >
              → becomes the PROBLEM in the spec
            </div>
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 14,
              justifyContent: "center",
            }}
          >
            {items.map((item, i) => {
              // Checklist after quote is readable: #1 @70 … #4 @124
              const start = 70 + i * 18;
              const t = spring({
                frame: frame - start,
                fps,
                config: SNAP,
              });
              const done = frame > start + 14;
              return (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    padding: "22px 26px",
                    border: `2px solid ${done ? colors.accent : colors.borderStrong}`,
                    background: done ? colors.accent : colors.bgElevated,
                    color: done ? colors.bg : colors.text,
                    opacity: t,
                    transform: `translateX(${interpolate(t, [0, 1], [24, 0])}px)`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: fonts.mono,
                      fontSize: 22,
                      fontWeight: 700,
                      width: 36,
                    }}
                  >
                    {done ? "✓" : String(i + 1).padStart(2, "0")}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: fonts.sans,
                        fontSize: 32,
                        fontWeight: 700,
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        marginTop: 4,
                        fontFamily: fonts.mono,
                        fontSize: 20,
                        opacity: 0.85,
                      }}
                    >
                      {item.detail}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </SceneLayout>
    </SceneShell>
  );
};

/**
 * Order: title → caption → file header → diff lines top→bottom → hold.
 * Duration: 135f (4.5s).
 */
export const EngScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lines = [
    { mark: "+", text: "export const DarkTheme = {" },
    { mark: "+", text: '  bg: "#000000",' },
    { mark: "+", text: '  text: "#ffffff",' },
    { mark: "−", text: "// TODO: dark mode" },
    { mark: "+", text: "};" },
    { mark: "+", text: "export default DarkTheme;" },
  ];

  return (
    <SceneShell>
      <SceneLayout>
        <div style={{ display: "flex", gap: 48, flex: 1, minHeight: 0 }}>
          <div style={{ width: 380, flexShrink: 0 }}>
            <StageIndex n="05  ·  ENGINEER" />
            <SceneTitle
              lines={["Ship the", "diff."]}
              springConfig={SNAP_SNAPPY}
            />
            <VizCaption text="Engineering implements the PM spec" delay={22} />
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              border: `2px solid ${colors.border}`,
              background: colors.bgElevated,
              minHeight: 600,
            }}
          >
            <div
              style={{
                padding: "16px 24px",
                borderBottom: `1px solid ${colors.border}`,
                fontFamily: fonts.mono,
                fontSize: 22,
                color: colors.muted,
                display: "flex",
                justifyContent: "space-between",
                opacity: fadeIn(frame, 28, 12),
              }}
            >
              <span>theme.ts</span>
              <span style={{ color: colors.text }}>opens PR #184</span>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {lines.map((line, i) => {
                // Lines after header: L1 @40 … L6 @100, then hold to 135
                const t = spring({
                  frame: frame - (40 + i * 12),
                  fps,
                  config: SNAP_SNAPPY,
                });
                const isDel = line.mark === "−";
                return (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 18,
                      padding: "0 24px",
                      borderTop: i === 0 ? undefined : `1px solid ${colors.border}`,
                      borderLeft: `6px solid ${isDel ? colors.danger : colors.accent}`,
                      opacity: t,
                      transform: `translateY(${interpolate(t, [0, 1], [14, 0])}px)`,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: fonts.mono,
                        fontSize: 36,
                        fontWeight: 700,
                        width: 36,
                        color: isDel ? colors.danger : colors.accent,
                      }}
                    >
                      {line.mark}
                    </div>
                    <div
                      style={{
                        fontFamily: fonts.mono,
                        fontSize: 28,
                        textDecoration: isDel ? "line-through" : undefined,
                        color: isDel ? colors.danger : colors.text,
                      }}
                    >
                      {line.text}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </SceneLayout>
    </SceneShell>
  );
};

/**
 * Order: title → caption → PR label → checks 1→4 → APPROVED → hold.
 * Duration: 150f (5s).
 */
export const ReviewScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const checks = [
    "Matches the PM “why”",
    "Fits brand & product rules",
    "No accessibility regressions",
    "Tests are green",
  ];
  // Banner only after last check has been readable
  const allDone = frame > 118;
  const banner = spring({
    frame: frame - 120,
    fps,
    config: SNAP_SOFT,
  });

  return (
    <SceneShell>
      <SceneLayout>
        <StageIndex n="06  ·  REVIEWER / QA" />
        <SceneTitle lines={["Prove it’s", "safe."]} />
        <VizCaption text="Code review before any human merge" delay={24} />

        <div
          style={{
            marginTop: 8,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 14,
            minHeight: 480,
          }}
        >
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 26,
              color: colors.text,
              letterSpacing: "0.04em",
              opacity: fadeIn(frame, 30, 12),
            }}
          >
            PR #184 · Add dark mode
          </div>

          {checks.map((c, i) => {
            // Checks after label: #1 @42 … #4 @96
            const start = 42 + i * 18;
            const t = spring({
              frame: frame - start,
              fps,
              config: SNAP,
            });
            const checked = frame > start + 12;
            return (
              <div
                key={c}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 22,
                  padding: "22px 28px",
                  background: checked ? colors.card : colors.bg,
                  border: `2px solid ${colors.borderStrong}`,
                  color: checked ? colors.cardText : colors.text,
                  opacity: t,
                  transform: `translateY(${interpolate(t, [0, 1], [14, 0])}px)`,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    border: `3px solid ${checked ? colors.cardText : colors.borderStrong}`,
                    background: checked ? colors.cardText : "transparent",
                    color: checked ? colors.card : colors.text,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: fonts.mono,
                    fontSize: 26,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {checked ? "✓" : String(i + 1)}
                </div>
                <div
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: 42,
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.15,
                  }}
                >
                  {c}
                </div>
              </div>
            );
          })}

          <div
            style={{
              marginTop: 8,
              padding: "26px 28px",
              background: colors.card,
              color: colors.cardText,
              fontFamily: fonts.sans,
              fontSize: 40,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              opacity: allDone ? banner : 0,
              transform: `translateY(${interpolate(banner, [0, 1], [16, 0])}px)`,
              border: `2px solid ${colors.borderStrong}`,
            }}
          >
            APPROVED — ready for human merge
          </div>
        </div>
      </SceneLayout>
    </SceneShell>
  );
};

/**
 * Order: title → caption → Step 1 alone → Step 2 question → merged → done → hold.
 * Duration: 180f (6s). Step 2 never mounts before Step 1 is readable.
 */
export const MergeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Step 1: 32–85 alone · Step 2 question: 90–130 · merge: 135+ · done: 145+
  const showHuman = frame > 88;
  const merged = frame > 135;
  const statusIn = spring({ frame: frame - 32, fps, config: SNAP_SOFT });
  const humanIn = spring({ frame: frame - 90, fps, config: SNAP_SOFT });
  const doneIn = spring({ frame: frame - 145, fps, config: SNAP_SOFT });

  return (
    <SceneShell>
      <SceneLayout>
        <StageIndex n="07  ·  HUMAN ENGINEER" />
        <SceneTitle
          lines={["A human still", "decides."]}
          springConfig={SNAP_SOFT}
        />
        <VizCaption text="Agents propose. You decide." delay={26} />

        <div
          style={{
            marginTop: 24,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 22,
            justifyContent: "center",
            maxWidth: 1200,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              padding: "30px 34px",
              border: `2px solid ${colors.borderStrong}`,
              background: colors.bgElevated,
              opacity: statusIn,
            }}
          >
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 22,
                letterSpacing: "0.1em",
                color: colors.text,
                width: 140,
              }}
            >
              STEP 1
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: fonts.sans,
                  fontSize: 38,
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  color: colors.text,
                }}
              >
                PR #184 approved by review agent
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontFamily: fonts.mono,
                  fontSize: 24,
                  color: colors.muted,
                }}
              >
                Add dark mode · all checks passed
              </div>
            </div>
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 26,
                fontWeight: 700,
                color: colors.text,
              }}
            >
              READY
            </div>
          </div>

          {showHuman ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                padding: "30px 34px",
                border: `2px solid ${colors.borderStrong}`,
                background: merged ? colors.card : colors.bgElevated,
                opacity: humanIn,
              }}
            >
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 22,
                  letterSpacing: "0.1em",
                  color: merged ? colors.cardText : colors.text,
                  width: 140,
                }}
              >
                STEP 2
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: 38,
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    color: merged ? colors.cardText : colors.text,
                  }}
                >
                  {merged ? "You merged into main" : "Merge into main?"}
                </div>
                <div
                  style={{
                    marginTop: 8,
                    fontFamily: fonts.mono,
                    fontSize: 24,
                    color: merged ? "#444444" : colors.muted,
                  }}
                >
                  {merged
                    ? "Human confirmed — agents cannot auto-merge"
                    : "HUMAN REQUIRED — only you can click this"}
                </div>
              </div>
              <div
                style={{
                  background: merged ? colors.cardText : colors.borderStrong,
                  color: merged ? colors.card : colors.bg,
                  fontFamily: fonts.sans,
                  fontSize: 28,
                  fontWeight: 700,
                  padding: "18px 24px",
                  minWidth: 210,
                  textAlign: "center",
                }}
              >
                {merged ? "MERGED" : "Confirm merge"}
              </div>
            </div>
          ) : null}

          <div
            style={{
              padding: "20px 34px",
              fontFamily: fonts.mono,
              fontSize: 30,
              letterSpacing: "0.06em",
              color: colors.text,
              opacity: merged ? doneIn : 0,
            }}
          >
            ✓  feature/dark-mode  →  main
          </div>
        </div>
      </SceneLayout>
    </SceneShell>
  );
};

/**
 * Order: title → caption → LIVE panel → checklist 1→4 → hold.
 * Duration: 120f (4s).
 */
export const ProductionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({
    frame: frame - 28,
    fps,
    config: SNAP_SOFT,
  });
  const pulse = interpolate(Math.sin(frame / 12), [-1, 1], [0.88, 1]);
  const steps = [
    "Reviews ingested",
    "Themes clustered",
    "PRs opened",
    "Reviewed & merged",
  ];

  return (
    <SceneShell>
      <SceneLayout>
        <StageIndex n="08  ·  PRODUCTION" tone="accent" />
        <SceneTitle
          lines={["Live.", "Loop closed."]}
          springConfig={SNAP_SOFT}
        />
        <VizCaption text="Harmony closed the loop — review to ship" delay={24} />

        <div
          style={{
            marginTop: 12,
            flex: 1,
            display: "flex",
            gap: 36,
            minHeight: 460,
          }}
        >
          <div
            style={{
              flex: 1.2,
              border: `2px solid ${colors.borderStrong}`,
              background: colors.bgElevated,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 18,
              opacity: t,
              transform: `scale(${interpolate(t, [0, 1], [0.97, 1])})`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: colors.text,
                  transform: `scale(${pulse})`,
                }}
              />
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 26,
                  letterSpacing: "0.22em",
                  color: colors.text,
                  fontWeight: 700,
                }}
              >
                LIVE
              </div>
            </div>
            <div
              style={{
                fontFamily: fonts.sans,
                fontSize: 88,
                fontWeight: 700,
                letterSpacing: "-0.05em",
              }}
            >
              Dark mode
            </div>
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 24,
                color: colors.muted,
                letterSpacing: "0.08em",
              }}
            >
              SHIPPED TO PRODUCTION
            </div>
          </div>

          <div
            style={{
              flex: 0.85,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 20,
            }}
          >
            {steps.map((s, i) => {
              // Checklist after LIVE panel: #1 @50 … #4 @95, then hold to 120
              const st = spring({
                frame: frame - (50 + i * 15),
                fps,
                config: SNAP_SOFT,
              });
              return (
                <div
                  key={s}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    opacity: st,
                  }}
                >
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      background: colors.accent,
                      color: colors.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: fonts.mono,
                      fontWeight: 700,
                      fontSize: 16,
                    }}
                  >
                    ✓
                  </div>
                  <div
                    style={{
                      fontFamily: fonts.sans,
                      fontSize: 32,
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {s}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </SceneLayout>
    </SceneShell>
  );
};
