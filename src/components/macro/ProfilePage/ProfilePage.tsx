import Heading from "../../micro/Heading/Heading";
import Header from "../global/header/Header";
import styles from "./ProfilePage.module.scss"
import Footer from "../global/footer/Footer";

import { ProfilePageProps } from "./ProfilePage.props";
import PlaylistCard from "./PlaylistCard/PlaylistCard.";
import { useState, useEffect } from 'react';
import http from "../../../services/http.service";
import { useParams } from "react-router-dom";

import { UserDTO } from "../../../dtos/user.dto";
import { PlaylistDTO } from "../../../dtos/playlist.dto";
import { getById } from "../../../services/users.services";

const ProfilePage = ({ }: ProfilePageProps): JSX.Element => {

  const token = localStorage.getItem("token")
  const propURL = useParams()

  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const [profile, setProfile] = useState<UserDTO | null>(null)
  const [playlist, setPlaylist] = useState<Array<PlaylistDTO>>([])

  const [playlistData, setPlaylistData] = useState<PlaylistDTO | null>(null)

  var bannerUrl = ""
  var avatarUrl = ""

  //localStorage.setItem("token", "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJteUJhY2tlbmQiLCJzdWIiOiIxMiIsImV4cCI6MTcxNzEyODg5MSwiaWF0IjoxNzE3MTAwMDkxfQ.K8caPNqmhjZIGOPyK6_7PC7P0aVyfTdOJOP16C__6yPjn4RDdQCEpXhFBfjAHH7lnRWhdTwil2FVhaotvBCnms_UU6VKZSYM_lAKio6-a29p4XI56QemmdnIISuuQmk6H-QVZWAo3HsSRcVX2u3__ZDDp72aDGRsUFSUN-edcsAbMW_LfJeL8OoKP-4t1wn7JGfWqgZARLoHNPg1p0WdGipsJaw0ba3NGKhobY5mmBJrd2Gmovb7dXCn0qqJ5VnbvP7IxF3rA2af1RfcxWEqgIqEJMaOQblbr2I8wJgzBjBsr-VEYuetq39khpXzgLuSEPUf-PgEopufymuIKuSWag")
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getById(Number(propURL.id), {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        })
        setProfile(response.data)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }
    fetchProfile()

    const fetchPlaylist = async () => {
      try {
        const response = await http.get(`/users/${propURL.name}/playlists`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        })
        setPlaylist(response.data)
      } catch (error) {
        console.error('Error fetching playlist:', error)
      }
    }
    fetchPlaylist()
  }, []);

  if(profile?.userImages == null) {
    bannerUrl = "https://lumina-sound.s3.sa-east-1.amazonaws.com/images/bannerSemPerfil.svg"
    avatarUrl = "https://lumina-sound.s3.sa-east-1.amazonaws.com/images/fotoSemPerfil.svg"
  } else {
    bannerUrl = profile.userImages[1].imageURL
    avatarUrl = profile.userImages[0].imageURL
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
                <label htmlFor="avatarProfile">Avatar do perfil (350px x 350px)</label>
                <input name="avatarProfile" type="file" accept="image/png, image/gif, image/jpeg" />

                <label htmlFor="bannerProfile">Banner do perfil (1440px x 350px)</label>
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
          {
            playlist.map((playlistE) => {
              return (
                <PlaylistCard
                  id={playlistE.id}
                  imgUrl={playlistE.coverImageUrl}
                  nomePlaylist={playlistE.name}
                />
              )
            })
          }
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

                <label htmlFor="bannerProfile"><strong>Imagem da playlist</strong> (1440px x 350px)</label>
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