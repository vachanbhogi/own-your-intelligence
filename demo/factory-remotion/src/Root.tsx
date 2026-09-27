import { Composition, Folder } from "remotion";
import "./index.css";
import { FactoryVideo, TOTAL_FRAMES, VIDEO, scenes } from "./FactoryVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="FactoryPipeline"
        component={FactoryVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
      />
      <Folder name="Scenes">
        {scenes.map((s) => (
          <Composition
            key={s.name}
            id={s.name}
            component={s.Comp}
            durationInFrames={s.durationInFrames}
            fps={VIDEO.fps}
            width={VIDEO.width}
            height={VIDEO.height}
          />
        ))}
      </Folder>
    </>
  );
};
