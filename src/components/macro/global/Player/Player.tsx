import styles from "./Player.module.scss"
import AudioPlayer, { PlayList } from "react-modern-audio-player";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

export default function Player() {
  const sessionToken = useSelector<RootState>(state => state.general.sessionToken)
  const queue = useSelector<RootState, PlayList>(state => state.general.queue)
  
  return (
    <>
      {(!!sessionToken && !!queue.length) &&
        <div className={styles.playerContainer}>
          <AudioPlayer
            playList={queue}
            activeUI={{
              all: true,
              progress: "bar"
            }}
            placement={{
              player: "bottom-left",
              playList: "top",
              volumeSlider: "top"
            }}
            rootContainerProps={{
              colorScheme: "dark",
              width: "100%"
            }}
          />
        </div>
      }
    </>
  );
}
