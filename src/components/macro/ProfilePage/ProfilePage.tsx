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
import http from "../../../services/http.service";
import { useParams } from "react-router-dom";

import { UserDTO } from "../../../dtos/user.dto";
import { PlaylistDTO } from "../../../dtos/playlist.dto";
import { getById } from "../../../services/users.services";
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

  const [profile, setProfile] = useState<UserDTO | null>(null)
  const [playlist, setPlaylist] = useState<Array<PlaylistDTO>>([])

  const propURL = useParams()
  localStorage.setItem("token", "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJteUJhY2tlbmQiLCJzdWIiOiIxMiIsImV4cCI6MTcxNzEwMjk1NSwiaWF0IjoxNzE3MDc0MTU1fQ.bm5IM4IzKeikfz-_MQzreon9XUuShnGgy5mw6ku3D6f9WfeW_P2IKmwBRQ1Jihb-Pl8HN0AcD7GC7IjYKmN6zo1ilFN_AvHufB9pNGt2DBZ44mwlAIy2FKYlEL_v0e5BvNPlcUdS0fGBT4leKNHuiAAE1uGCXhCghofajs82PUaBTMS7Y5qGF0xf7OCbQ02mjGAsdYrkkaGf2OBoV9Vt7-KE160Yp5hXf5ABCn_F4C9wHntRa0Yg1VpgqJ5iEcM0F2CcwiF49GThYAugv2ZYyz4oSxPyc6x35bDU_XH7m74FcszI4KAyZwxYP-8fZAk0L9T1oqlCNnqx6PJeOKvw2w")

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getById(Number(propURL.id), {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })//http.get(`/users/${propURL.id}`)
        setProfile(response.data)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }

    fetchProfile()

    const fetchPlaylist = async () => {
      try {
        const response = await http.get("/playlists")
        setPlaylist(response.data)
      } catch (error) {
        console.error('Error fetching playlist:', error)
      }
    }
    fetchPlaylist()
  }, []);

  var bannerUrl = ""
  var avatarUrl = ""

  if(profile?.userImage == null) {
    bannerUrl = "https://lumina-sound.s3.sa-east-1.amazonaws.com/images/bannerSemPerfil.svg"
    avatarUrl = "https://lumina-sound.s3.sa-east-1.amazonaws.com/images/fotoSemPerfil.svg"
  } else {
    bannerUrl = "https://lumina-sound.s3.sa-east-1.amazonaws.com/images/artists/Danger/bannerDanger.jpg"
    avatarUrl = "https://lumina-sound.s3.sa-east-1.amazonaws.com/images/artists/Danger/Danger.jpg"
  }
  
  return (
    <>
      <Header view="normal" logged={false} />

      <section className={styles[`profileInfo`]}>
        <img className={styles[`bannerImage`]} src={bannerUrl} />
        <div className={styles[`pictureProfile`]}>
          <img className={styles["avatarProfile"]} src={avatarUrl} />
          <Heading level={1} className={`${styles[`h1Profile`]}`}>{profile?.name}</Heading>
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