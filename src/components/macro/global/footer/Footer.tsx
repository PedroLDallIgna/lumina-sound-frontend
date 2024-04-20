import styles from './Footer.module.scss'
import Link from '../../../micro/Link/Link';
//import Input from '../../../micro/Input/Input';
import { NavLink } from 'react-router-dom';

const Footer = (): JSX.Element => {
        return (
            <header className={`${styles[`footer`]}`}>
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

export default Footer;
