import { AbsoluteFill } from "remotion";
import { colors, fonts } from "../lib/theme";

export const SceneShell: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <AbsoluteFill
    style={{
      backgroundColor: colors.bg,
      overflow: "hidden",
      fontFamily: fonts.sans,
    }}
  >
    {children}
  </AbsoluteFill>
);
