import Heading from "../../../micro/Heading/Heading";
import Header from "../../global/header/Header";
import styles from "./ArtistProfilePage.module.scss"
import Footer from "../../global/footer/Footer";

import { LabelDTO } from "../../../../dtos/label.dto";
import { ArtistAccountDTO } from "../../../../dtos/artistAccount.dto";
import http from "../../../../services/http.service";

import { useParams } from "react-router-dom";

import { useState, useEffect } from 'react';
import CardAlbum from "../../home/CardAlbum/cardAlbum";

const useLockBodyScroll = (isLocked: boolean) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow

    if (isLocked) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = originalStyle

    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [isLocked])
}

const ArtistProfilePage = (): JSX.Element => {

  const [label, setLabel] = useState<Array<LabelDTO>>([])
  const [album, setAlbum] = useState<Array<AlbumDTO>>([])
  const [artist, setArtist] = useState<ArtistAccountDTO>()

  const propURL = useParams()

  function fetch(request: string) {


    const fetch = async () => {
        try {
          const response = await http.get(request)

          if(request === "/labels") setLabel(response.data)
          else if(request === `/artists/${propURL.name?.replaceAll(" ", "")}`) setArtist(response.data)
          else if(request === `/artists/${propURL.name?.replaceAll(" ", "")}/albums`) setAlbum(response.data)
        
          } catch (error) {
          console.error('Error fetching label:', error)
        }
    }
    fetch()
  }

  useEffect(() => {
    fetch("/labels")
    fetch(`/artists/${propURL.name?.replaceAll(" ", "")}/albums`)
    fetch(`/artists/${propURL.name?.replaceAll(" ", "")}`)
  }, [])

  const [openAlbum, setOpenAlbum] = useState(false)
  const [openTrack, setOpenTrack] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)


  let bannerUrl
  let avatarUrl

  if(artist?.artistImages[0].imageURL == null) {
    bannerUrl = "https://lumina-sound.s3.sa-east-1.amazonaws.com/images/bannerSemPerfil.svg"
    avatarUrl = "https://lumina-sound.s3.sa-east-1.amazonaws.com/images/fotoSemPerfil.svg"
  } else {
    bannerUrl = artist?.artistImages[1].imageURL
    avatarUrl = artist?.artistImages[0].imageURL
  }

  return (
    <>
      <Header view="normal" />

      <section className={styles[`profileInfo`]}>
        <img className={styles[`bannerImage`]} src={bannerUrl} />
        <div className={styles[`pictureProfile`]}>
          <img className={styles["avatarProfile"]} src={avatarUrl} />
          <Heading level={1} className={`${styles[`h1Profile`]}`}>{artist?.name}</Heading>
        </div>

        <button className={styles[`btnEdit`]} onClick={() => setOpenEdit(!openEdit)}>Editar perfil</button>

      </section>

      <section className={styles[`containerActions`]}>
        <button className={styles[`btnAction`]} onClick={() => setOpenTrack(!openTrack)}>Criar Música</button>
        <button className={styles[`btnAction`]} onClick={() => setOpenAlbum(!openAlbum)}>Criar Album</button>
      </section>

      {
        openTrack && (
          <div className={styles[`fundoModal`]}>
            <section className={styles[`modalAdd`]}>
              <div className={styles[`topModal`]}>
                <p>Adicionar nova música</p>
                <p className={styles[`closeModal`]} onClick={() => setOpenTrack(!openTrack)}>X</p>
              </div>

              <form action="post" className={styles[`formModal`]}>
                <input type="text" placeholder="Título da Música" />

                <select name="labels" id="labels">
                  <option value="">Selecione a sua gravadora</option>
                  {
                    label.map((label) => (
                      <option value={label.id}>{label.name}</option>
                    ))
                  }
                </select>

                <select name="albuns" id="albuns">
                  <option value="">Selecione o album da música</option>
                  {
                    album.map((album) => (
                      <option value={album.id}>{album.name}</option>
                    ))
                  }
                </select>

                <label htmlFor="audioTrack">Audio da música</label>
                <input name="audioTrack" type="file" accept="audio/mp3, audio/wav" placeholder="Audio da musica" />

                <label htmlFor="imgTrack">Capa do Single (foto quadrada)</label>
                <input name="imgTrack" type="file" accept="image/png, image/gif, image/jpeg" placeholder="Foto da música" />

                <button>Adicionar</button>
              </form>
            </section>
          </div>
        )
      }

      {
        openAlbum && (
          <div className={styles[`fundoModal`]}>
            <section className={styles[`modalAddAlbum`]}>
              <div className={styles[`topModal`]}>
                <p>Criar um novo albúm</p>
                <p className={styles[`closeModal`]} onClick={() => setOpenAlbum(!openAlbum)}>X</p>
              </div>

              <form action="post" className={styles[`formModal`]}>
                <input type="text" placeholder="Título do Albúm" />

                <label htmlFor="imgTrack">Capa do Albúm</label>
                <input name="imgTrack" type="file" accept="image/png, image/gif, image/jpeg" placeholder="Foto da música" />

                <button>Criar albúm</button>
              </form>
            </section>
          </div>
        )
      }

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

      <section className={styles[`albumList`]}>
        <Heading level={1} className={`${styles[`h1Home`]}`}>Meus Albuns<img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/playTitulo.svg" /></Heading>
        <div className={styles[`albumGrid`]}>
          {
            album.map((album) => {
              return (
                <CardAlbum
                  url={album.albumImageUrl}
                  nomeAlbum={album.name}
                />
              )
            })
          }
        </div>
      </section>

      <Footer />
    </>
  )
}

export default ArtistProfilePage