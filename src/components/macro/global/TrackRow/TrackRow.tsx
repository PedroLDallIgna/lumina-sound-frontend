import styles from "./TrackRow.module.scss"
import { TrackRowProps } from "./TrackRow.props"

const TrackRow = ({musicUrl, nameTrack, artist, album, time}: TrackRowProps): JSX.Element => {
  return (
    <tr className={styles[`trackRow`]}>
      <td><img src={musicUrl}/></td>
      <td>{nameTrack}</td>
      <td>{artist}</td>
      <td>{album}</td>
      <td>{time}</td>
      <td><img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/actionBtn.svg"/></td>
    </tr>
  )
}

export default TrackRow