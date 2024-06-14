import { Link } from "react-router-dom"
import styles from "./TrackRow.module.scss"
import { TrackRowProps } from "./TrackRow.props"

const TrackRow = ({artistId, musicUrl, nameTrack, artistName, album, time, track}: TrackRowProps): JSX.Element => {
  return (
    <tr className={styles[`trackRow`]}>
      <td><img src={track?.coverImageUrl ?? musicUrl}/></td>
      <td>{track?.title ?? nameTrack}</td>
      <td>
        {track?.artists.length
          ? track?.artists.map((artist, index) => 
            <>
              <Link key={artist.id ?? index} to={`/artists/${artist.username}`}>{artist.name}</Link>
              {index !== track.artists.length - 1 && ', '}
            </>
          ) : artistName
        }
      </td>
      <td>{album}</td>
      <td>{track?.length ?? time}</td>
      <td><img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/actionBtn.svg"/></td>
    </tr>
  )
}

export default TrackRow