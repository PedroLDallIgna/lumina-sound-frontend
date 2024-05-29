import Heading from "../../micro/Heading/Heading";
import Header from "../global/header/Header";
//import TrackRow from "../global/TrackRow/TrackRow";
//import CardArtist from "../home/CardArtist/cardArtist";
//import Heading from "../../micro/Heading/Heading"
import styles from "./ProfilePage.module.scss"
import Footer from "../global/footer/Footer";

import { ProfilePageProps } from "./ProfilePage.props";
import PlaylistCard from "./PlaylistCard/PlaylistCard.";
//import Paragraph from "../../micro/Paragraph/Paragraph";
import { useState, useEffect } from 'react';
/*

import { getById } from "../../../services/artistAccount.services";
import { ArtistAccountDTO } from "../../../dtos/artistAccount.dto";
import { TrackDTO } from "../../../dtos/track.dto";
import http from "../../../services/http.service";
import { useParams } from "react-router-dom";
*/

const ProfilePage = ({ }: ProfilePageProps): JSX.Element => {

  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const bannerUrl = "https://lumina-sound.s3.sa-east-1.amazonaws.com/images/artists/Danger/bannerDanger.jpg"
  const avatarUrl = "https://lumina-sound.s3.sa-east-1.amazonaws.com/images/artists/Danger/Danger.jpg"

  return (
    <>
      <Header view="normal" logged={false} />

      <section className={styles[`profileInfo`]}>
        <img className={styles[`bannerImage`]} src={bannerUrl} />
        <div className={styles[`pictureProfile`]}>
          <img className={styles["avatarProfile"]} src={avatarUrl} />
          <Heading level={1} className={`${styles[`h1Profile`]}`}>Henrique Bonatto</Heading>
        </div>

        <button className={styles[`btnEdit`]} onClick={() => setOpenEdit(!openEdit)}>Editar perfil</button>
      </section>

      {
        openEdit && (
          <div className={styles[`fundoModal`]}>
            <section className={styles[`modalAddAlbum`]}>
              <div className={styles[`topModal`]}>
                <p>Editar imagens do perfil</p>
                <p className={styles[`closeModal`]} onClick={() => setOpenEdit(!openEdit)}>X</p>
              </div>

              <form action="post" className={styles[`formModal`]}>
                <label htmlFor="avatarProfile">Avatar do perfil</label>
                <input name="avatarProfile" type="file" accept="image/png, image/gif, image/jpeg" />

                <label htmlFor="bannerProfile">Banner do perfil</label>
                <input name="bannerProfile" type="file" accept="image/png, image/gif, image/jpeg" />
                <button>Editar imagens</button>
              </form>
            </section>
          </div>
        )
      }

      <section className={styles[`playlistList`]}>
        <Heading level={1} className={`${styles[`h1Home`]}`}>Minhas Playlists<img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/playTitulo.svg" /></Heading>
        <div className={styles[`playlistGrid`]}>
          <PlaylistCard 
            nomePlaylist="As melhores de 2024"
          />
          <PlaylistCard 
            nomePlaylist="As melhores de 2024"
          />
          <PlaylistCard 
            nomePlaylist="As melhores de 2024"
          />
          <PlaylistCard 
            nomePlaylist="As melhores de 2024"
          />
          <PlaylistCard 
            nomePlaylist="As melhores de 2024"
          />
          <PlaylistCard 
            nomePlaylist="As melhores de 2024"
          />
          <PlaylistCard 
            nomePlaylist="As melhores de 2024"
          />
          <PlaylistCard 
            nomePlaylist="As melhores de 2024"
          />
          <PlaylistCard 
            nomePlaylist="As melhores de 2024"
          />
        </div>

        <div className={styles[`containerCreatePlaylist`]}>
          <div className={styles[`btnCreate`]} onClick={() => setOpen(!open)}>
            <p>Criar Playlist</p>
            <img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/addPlaylist.svg" width="20px" />
          </div>
          {
            open && (
              <form className={styles[`formCreatePlaylist`]} typeof="submit">
                <input type="text" placeholder="Nome da playlist" />
                <input type="text" placeholder="Descricão da playlist" />

                <label htmlFor="bannerProfile">Imagem da playlist</label>
                <input name="bannerProfile" type="file" accept="image/png, image/gif, image/jpeg" />

                <button>Criar</button>
              </form>
            )
          }
        </div>
      </section>

      <Footer />
    </>
  )
}

export default ProfilePage