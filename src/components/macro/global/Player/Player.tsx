import styles from "./Player.module.scss"
import AudioPlayer from "react-h5-audio-player";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { useEffect, useRef, useState } from "react";
import { TrackResponse } from "../../../../types/trackResponse.type";
import { Link } from "react-router-dom";
import "react-h5-audio-player/lib/styles.css"
import "./player.scss"
import classNames from "classnames";

const PlayerHeader = ({ queue, currentTrack }: { queue: TrackResponse[], currentTrack: number }) => {

  const [expanded, setExpanded] = useState(false)
  const trackList = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (expanded && trackList.current) {
      const scrollFactor = trackList.current.scrollHeight / queue.length
      trackList.current.scrollTop = scrollFactor * currentTrack 
    }
  }, [expanded])

  return (
    <div className={styles.playerHeader}>
      <div className={styles.trackInfoContainer}>
        <div className={styles.trackPlaying}>
          <div className={styles.trackCoverImage}>
            <img src={queue[currentTrack].coverImageUrl ?? ""} alt="" />
          </div>
          <div className={styles.trackInfo}>
            <p className={styles.trackTitle}>{queue[currentTrack].title}</p>
            <div className={styles.trackArtists}>
              {queue[currentTrack].artists.map((artist, index) =>
                <><Link key={index} to={`/artists/${artist.username}`}>{artist.name}</Link>{index !== queue[currentTrack].artists.length - 1 && ", "}</>
              )}
            </div>
          </div>
        </div>
        <button className={classNames(styles.expandButton)} onClick={() => setExpanded(expanded => !expanded)}><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path fill="currentColor" d="M3 10h11v2H3zm0-4h11v2H3zm0 8h7v2H3zm13-1v8l6-4z" /></svg></button>
      </div>
      <ul ref={trackList} className={classNames(styles.trackList, { [styles['trackList--expanded']]: expanded })}>
        {queue.map((track, index) =>
          <li key={index} className={classNames(styles.trackItem, { [styles['trackItem--current']]: index === currentTrack, [styles['trackItem--played']]: index < currentTrack })}>{index + 1} - {track.title}</li>
        )}
      </ul>
    </div>
  )
}

export default function Player() {
  const sessionToken = useSelector<RootState>(state => state.general.sessionToken)
  const queue = useSelector<RootState, TrackResponse[]>(state => state.general.queue)

  const [currentTrack, setTrackIndex] = useState(0)

  const handleClickNext = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < queue.length - 1 ? currentTrack + 1 : queue.length - 1
    );
  };

  const handleClickPrevious = () => {
    setTrackIndex((currentTrack) =>
      currentTrack > 0 ? currentTrack - 1 : 0
    )
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
            onClickPrevious={handleClickPrevious}
            showJumpControls={false}
            header={!!queue.length ? <PlayerHeader currentTrack={currentTrack} queue={queue} /> : <></>}
          />
        </div>
      }
    </>
  );
}
