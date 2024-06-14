import styles from "./Player.module.scss"
import AudioPlayer from "react-h5-audio-player";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { useState } from "react";
import { TrackResponse } from "../../../../types/trackResponse.type";
import { Link } from "react-router-dom";
import "react-h5-audio-player/lib/styles.css"
import "./player.scss"

const PlayerHeader = ({trackInfo}: {trackInfo: TrackResponse}) => {
  return (
    <div className={styles.trackInfo}>
      <div className={styles.trackCoverImage}>
        <img src={trackInfo.coverImageUrl ?? ""} alt="" />
      </div>
      <p className={styles.trackTitle}>{trackInfo.title}</p>
      <div className={styles.trackArtists}>
        {trackInfo.artists.map((artist, index) => 
          <><Link key={index} to={`/artists/${artist.username}`}>{artist.name}</Link>{index !== trackInfo.artists.length - 1 && ", "}</>
        )}
      </div>
    </div>
  )
}

export default function Player() {
  const sessionToken = useSelector<RootState>(state => state.general.sessionToken)
  const queue = useSelector<RootState, TrackResponse[]>(state => state.general.queue)

  const [currentTrack, setTrackIndex] = useState(0)
  const handleClickNext = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < queue.length - 1 ? currentTrack + 1 : 0
    );
  };

  const handleEnd = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < queue.length - 1 ? currentTrack + 1 : 0
    );
  }

  return (
    <>
      {(!!sessionToken && !!queue.length) &&
        <div className={styles.playerContainer}>
          <AudioPlayer
            src={queue[currentTrack].url}
            showSkipControls
            autoPlayAfterSrcChange={true}
            onClickNext={handleClickNext}
            onEnded={handleEnd}
            showJumpControls={false}
            header={<PlayerHeader trackInfo={queue[currentTrack]} />}
          />
        </div>
      }
    </>
  );
}
