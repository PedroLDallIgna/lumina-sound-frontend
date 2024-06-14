import styles from "./CardAlbum.module.scss"
import { CardAlbumProps } from "./CardAlbum.props"
import Heading from "../../../micro/Heading/Heading"
import Link from "../../../micro/Link/Link"

const CardAlbum = ({ album }: CardAlbumProps): JSX.Element => {
  return (
    <Link url={`/albums/${album.id}`} classe="linkCard">
      <div className={`${styles["cardAlbum"]}`}>
        <img className={`${styles["imgCard"]}`} src={album.albumImageUrl} />
        <div className={`${styles["containerTexts"]}`}>
          <div>
            <Heading level={1}>{album.name}</Heading>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CardAlbum
