import Heading from "../../../micro/Heading/Heading";
import Header from "../../global/header/Header";
//import TrackRow from "../global/TrackRow/TrackRow";
//import CardArtist from "../home/CardArtist/cardArtist";
//import Heading from "../../micro/Heading/Heading"
import styles from "./ArtistProfilePage.module.scss"
import Footer from "../../global/footer/Footer";

import { ArtistProfilePageProps } from "./ArtistProfilePage.props";
//import Paragraph from "../../micro/Paragraph/Paragraph";
import { useState, useEffect } from 'react';
/*

import { getById } from "../../../services/artistAccount.services";
import { ArtistAccountDTO } from "../../../dtos/artistAccount.dto";
import { TrackDTO } from "../../../dtos/track.dto";
import http from "../../../services/http.service";
import { useParams } from "react-router-dom";
*/

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

const ArtistProfilePage = ({ }: ArtistProfilePageProps): JSX.Element => {

  const [openAlbum, setOpenAlbum] = useState(false)
  const [openTrack, setOpenTrack] = useState(false)

  useLockBodyScroll(openAlbum || openTrack)

  const bannerUrl = "https://lumina-sound.s3.sa-east-1.amazonaws.com/images/artists/Danger/bannerDanger.jpg"
  const avatarUrl = "https://lumina-sound.s3.sa-east-1.amazonaws.com/images/artists/Danger/Danger.jpg"

  return (
    <>
      <Header view="normal" logged={false} />

      <section className={styles[`profileInfo`]}>
        <img className={styles[`bannerImage`]} src={bannerUrl} />
        <div className={styles[`pictureProfile`]}>
          <img className={styles["avatarProfile"]} src={avatarUrl} />
          <Heading level={1} className={`${styles[`h1Profile`]}`}>Danger</Heading>
        </div>
        
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
                  <option value="dog">artista 1</option>
                  <option value="cat">artista 2</option>
                  <option value="hamster">artista 3</option>
                </select>

                <select name="albuns" id="albuns">
                  <option value="">Selecione o album da música</option>
                  <option value="dog">artista 1</option>
                  <option value="cat">artista 2</option>
                  <option value="hamster">artista 3</option>
                </select>

                <label htmlFor="audioTrack">Audio da música</label>
                <input name="audioTrack" type="file" accept="audio/mp3, audio/wav" placeholder="Audio da musica" />

                <label htmlFor="imgTrack">Capa do Single</label>
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

      <section className={styles[`albumList`]}>
        <Heading level={1} className={`${styles[`h1Home`]}`}>Meus Albuns<img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/playTitulo.svg" /></Heading>
        <div className={styles[`albumGrid`]}>

        </div>
      </section>
      
      <Footer />
    </>
  )
}

export default ArtistProfilePage