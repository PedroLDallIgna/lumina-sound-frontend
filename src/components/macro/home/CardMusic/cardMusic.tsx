import styles from "./CardMusic.module.scss"
import { CardMusicProps } from "./CardMusic.props"
import Heading from "../../../micro/Heading/Heading"
import Link from "../../../micro/Link/Link"

const CardMusic = ({url, nomeMusica, artista}: CardMusicProps): JSX.Element => {
  return (
    <div className={`${styles["cardMusic"]}`}>
      <img className={`${styles["imgCard"]}`} src={url}/>
      <div className={`${styles["containerTexts"]}`}>
        <div>
          <Heading level={1}>{nomeMusica}</Heading>
          <Heading level={2}>{artista}</Heading>
        </div>
        <Link url={`/tracks/${nomeMusica.replace(" ", "")}_${artista.replace(" ", "")}`} classe="linkCard"><img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/playMusica.svg"/></Link>
      </div>
    </div>
  )
}

export default CardMusic