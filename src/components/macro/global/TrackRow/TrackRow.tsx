import styles from "./TrackRow.module.scss"
import { TrackRowProps } from "./TrackRow.props"

const TrackRow = ({musicUrl, nameTrack, artist, album, time}: TrackRowProps): JSX.Element => {
  return (
    <tr className={styles[`trackRow`]}>
      <td><img src={musicUrl}/> {nameTrack}</td>
      <td>{artist}</td>
      <td>{album}</td>
      <td>{time}</td>
      <td></td>
    </tr>
  )
}

export default TrackRow