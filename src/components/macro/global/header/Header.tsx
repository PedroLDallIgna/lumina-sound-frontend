import { LinkProps } from './Header.props'
import styles from './Header.module.scss'
import Link from '../../../micro/Link/Link';
import Input from '../../../micro/Input/Input';

const Header = ({ }: LinkProps): JSX.Element => {
    return (
        <header className={`${styles[`header`]}`}>
            <a href="/"><img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/header/logo.svg" /></a>

            <div className={`${styles[`linksMenuHeader`]}`}>
                <Link classe="linkNav" url="/">Home</Link>
                <Link classe="linkNav" url="/artists">Artistas</Link>
                <Link classe="linkNav" url="/playlists">Playlists</Link>
                <Link classe="linkNav" url="/about">Sobre</Link>
            </div>
            <div className={`${styles[`divActions`]}`}>
                <div className={`${styles[`divSearch`]}`}>
                    <Input type="search" campo="Busque sua música" classe="pesquisa" />
                    <img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/header/lupaPesquisa.svg" />
                </div>
            </div>
        </header>
    )
}

export default Header;
