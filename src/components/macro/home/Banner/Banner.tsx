import { BannerProps } from './Banner.props'
import styles from './Banner.module.scss'
import Link from '../../../micro/Link/Link';
import Heading from '../../../micro/Heading/Heading';

const Banner = ({track}: BannerProps): JSX.Element => {
  return (
    <article className={`${styles[`bannerHome`]}`}>
      <div className={`${styles[`infosBanner`]}`}>
        <div>
            <Heading level={2}>{track?.title}</Heading>
            <Heading level={3}>{track?.artists[0].name}</Heading>
        </div>
        <Link classe="btnBanner" url={`http://localhost:5173/artists/${track?.artists[0].id}`}>Play</Link>
      </div>
    </article>
  )
}

export default Banner;
