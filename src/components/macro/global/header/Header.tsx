import { HeaderProps } from './Header.props'
import styles from './Header.module.scss'
import Link from '../../../micro/Link/Link';
import Input from '../../../micro/Input/Input';
import Heading from '../../../micro/Heading/Heading';
import { NavLink } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { UserDTO } from '../../../../dtos/user.dto';
import { RootState } from '../../../../store';
import usersServices from '../../../../services/users.services';
import useHttp from '../../../../hooks/useHttp.hook';

const Header = ({ view }: HeaderProps) => {
    const sessionToken = useSelector<RootState, string | undefined>(state => state.general.sessionToken)
    const [currentUser, setCurrentUser] = useState<UserDTO | undefined>(undefined)
    const [open, setOpen] = useState(false)

    const fetchCurrentUser = useHttp(usersServices.get)

    useEffect(() => {
        const fetchUser = async () => {
            if (sessionToken) {
                const response = await fetchCurrentUser(sessionToken)
                setCurrentUser(response.data)
                localStorage.setItem('currentUser', JSON.stringify(currentUser))
            } else {
                localStorage.removeItem('currentUser')
            }
        }
        fetchUser()
    }, [currentUser])

    return (
        <header className={`${styles[`header`]}`}>
            <NavLink to="/"><img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/header/logo.svg" /></NavLink>

            <div className={`${styles[`linksMenuHeader`]}`}>
                <Link classe="linkNav" url="/">Home</Link>
                <Link classe="linkNav" url="/artists">Artistas</Link>
                {view !== 'login' &&
                    (!!sessionToken ? (
                        (<Link classe="linkNav" url={`/profile/${currentUser?.username}`}>Suas Playlists</Link>)
                    ) : (
                        (<Link classe="linkNav" url="/login">Suas Playlists</Link>)))
                }
                <Link classe="linkNav" url="/tracks">Músicas</Link>
            </div>
            {view !== 'login' &&
                (!!sessionToken 
                    ? (<div className={`${styles[`divActionsLogged`]}`}>
                        <div className={`${styles[`divSearch`]}`}>
                            <Input id="pesquisa" type="search" campo="Busque sua música" classe="pesquisa" />
                            <img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/header/lupaPesquisa.svg" />
                        </div>    
                        <div className={`${styles[`dropDownBtn`]}`} onClick={() => setOpen(!open)}>
                            <Heading level={1}>{currentUser?.name} <img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/header/arrow+header.svg" /></Heading>
                            {
                                open && (
                                    <div className={`${styles[`dropDownMenu`]}`}>
                                        <Link url={`/profile/${currentUser?.username}`} classe='linkNav'>Perfil</Link>
                                        <Link url='/' classe='linkNav'>Sair</Link>
                                    </div>
                                )
                            }
                        </div>
                    </div>)
                    : (<div className={`${styles[`divActions`]}`}>
                        <div className={`${styles[`divSearch`]}`}>
                            <Input id="pesquisa" type="search" campo="Busque sua música" classe="pesquisa" />
                            <img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/header/lupaPesquisa.svg" />
                        </div>
                        <Link classe="btnLogin" url="/login">Login</Link>
                    </div>)
                )
            }
        </header>
    )
}

export default Header;
