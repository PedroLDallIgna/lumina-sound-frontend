import styles from "./CardAlbum.module.scss"
import { CardAlbumProps } from "./CardAlbum.props"
import Heading from "../../../micro/Heading/Heading"
import Link from "../../../micro/Link/Link"

const CardAlbum = ({ url, nomeAlbum }: CardAlbumProps): JSX.Element => {
  return (
    <Link url={`/playlist/album/${nomeAlbum.trim().replaceAll(" ", "")}/1`} classe="linkCard">
      <div className={`${styles["cardAlbum"]}`}>
        <img className={`${styles["imgCard"]}`} src={url} />
        <div className={`${styles["containerTexts"]}`}>
          <div>
            <Heading level={1}>{nomeAlbum}</Heading>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CardAlbum