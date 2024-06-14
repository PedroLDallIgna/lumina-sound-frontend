import { HeaderProps } from './Header.props'
import styles from './Header.module.scss'
import Link from '../../../micro/Link/Link';
import Input from '../../../micro/Input/Input';
import Heading from '../../../micro/Heading/Heading';
import { NavLink, useNavigate } from 'react-router-dom';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { UserDTO } from '../../../../dtos/user.dto';
import { RootState } from '../../../../store';

const Header = ({ view }: HeaderProps) => {
  const sessionToken = useSelector<RootState, string | undefined>(state => state.general.sessionToken)
  const currentUser = useSelector<RootState, UserDTO | undefined>(state => state.general.loggedUser)
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const navigate = useNavigate();

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault()
    navigate("/search", { state: { keyword: searchValue } })
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
      {view !== 'login' &&
        (!!sessionToken
          ? (<div className={`${styles[`divActionsLogged`]}`}>
            <form onSubmit={onSearch} className={`${styles[`divSearch`]}`}>
              <Input id="pesquisa" type="search" campo="Busque sua música" classe="pesquisa" value={searchValue} onInput={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)} />
              <img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/header/lupaPesquisa.svg" />
            </form>
            <div className={`${styles[`dropDownBtn`]}`} onClick={() => setOpen(!open)}>
              <Heading level={1}>{currentUser?.name} <img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/header/arrow+header.svg" /></Heading>
              {
                open && (
                  <div className={`${styles[`dropDownMenu`]}`}>
                    <Link url={`/profile`} classe='linkNav'>Perfil</Link>
                    <Link url={`/profile/artist`} classe='linkNav'>Artista</Link>
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
