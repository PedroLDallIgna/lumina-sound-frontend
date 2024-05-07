import styles from "./Player.module.scss"
import { PlayerProps } from "./Player.props"

const Player = ({musicUrl, nameTrack, artist, album, time}: PlayerProps): JSX.Element => {
  return (
    <section className={styles[`playerContainer`]}>
      <td><img src={musicUrl} width="80px"/></td>
      <td>{nameTrack}</td>
      <td>{artist}</td>
      <td>{album}</td>
      <td>{time}</td>
      <td><img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/actionBtn.svg"/></td>
    </section>
  )
}

export default Player