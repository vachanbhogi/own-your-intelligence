import { Series } from "remotion";
import {
  IngestSortScene,
  PickScene,
  TitleScene,
} from "./scenes/FrontHalf";
import {
  EngScene,
  MergeScene,
  PmScene,
  ProductionScene,
  ReviewScene,
} from "./scenes/BackHalf";
import { VIDEO } from "./lib/theme";

/**
 * Hard cuts only — no wipe/fade transitions.
 * Durations leave room to read every beat before the cut.
 * Total ≈ 42s at 30fps.
 */
export const scenes = [
  { name: "Title", Comp: TitleScene, durationInFrames: 120 },
  { name: "IngestSort", Comp: IngestSortScene, durationInFrames: 270 },
  { name: "Pick", Comp: PickScene, durationInFrames: 135 },
  { name: "PM", Comp: PmScene, durationInFrames: 150 },
  { name: "Eng", Comp: EngScene, durationInFrames: 135 },
  { name: "Review", Comp: ReviewScene, durationInFrames: 150 },
  { name: "Merge", Comp: MergeScene, durationInFrames: 180 },
  { name: "Production", Comp: ProductionScene, durationInFrames: 120 },
] as const;

export const TOTAL_FRAMES = scenes.reduce(
  (sum, s) => sum + s.durationInFrames,
  0,
);

export const FactoryVideo: React.FC = () => {
  return (
    <Series>
      {scenes.map((scene) => {
        const Comp = scene.Comp;
        return (
          <Series.Sequence
            key={scene.name}
            name={scene.name}
            durationInFrames={scene.durationInFrames}
          >
            <Comp />
          </Series.Sequence>
        );
      })}
    </Series>
  );
};

export { VIDEO };
export { SCENE } from "./lib/theme";
