import { HeaderProps } from './Header.props'
import styles from './Header.module.scss'
import Link from '../../../micro/Link/Link';
import Input from '../../../micro/Input/Input';
import { NavLink } from 'react-router-dom';

const Header = ({ view }: HeaderProps): JSX.Element => {
    if (view == "login") {
        return (
            <header className={`${styles[`header`]}`}>
                <NavLink to="/"><img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/header/logo.svg" /></NavLink>

                <div className={`${styles[`linksMenuHeader`]}`}>
                    <Link classe="linkNav" url="/">Home</Link>
                    <Link classe="linkNav" url="/artists">Artistas</Link>
                    <Link classe="linkNav" url="/playlists">Playlists</Link>
                    <Link classe="linkNav" url="/tracks">Músicas</Link>
                </div>
            </header>
        )
    }
    return (
        <header className={`${styles[`header`]}`}>
            <NavLink to="/"><img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/header/logo.svg" /></NavLink>

            <div className={`${styles[`linksMenuHeader`]}`}>
                <Link classe="linkNav" url="/">Home</Link>
                <Link classe="linkNav" url="/artists">Artistas</Link>
                <Link classe="linkNav" url="/playlists">Playlists</Link>
                <Link classe="linkNav" url="/tracks">Músicas</Link>
            </div>
            <div className={`${styles[`divActions`]}`}>
                <div className={`${styles[`divSearch`]}`}>
                    <Input id="pesquisa" type="search" campo="Busque sua música" classe="pesquisa" />
                    <img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/header/lupaPesquisa.svg" />
                </div>
                <Link classe="btnLogin" url="/login">Login</Link>
            </div>
        </header>
    )
}

export default Header;
