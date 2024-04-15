import { BannerProps } from './Banner.props'
import styles from './Banner.module.scss'
import Link from '../../../micro/Link/Link';
import Heading from '../../../micro/Heading/Heading';

const Banner = ({view}: BannerProps): JSX.Element => {
    return (
        <article className={`${styles[`bannerHome`]}`}>
            <div className={`${styles[`infosBanner`]}`}>
                <div>
                    <Heading level={2}>The Garden</Heading>
                    <Heading level={3}>NAVOS</Heading>
                </div>
                <Link classe="btnBanner" url='http://google.com'>Play</Link>
            </div>
        </article>
    )
}

export default Banner;
