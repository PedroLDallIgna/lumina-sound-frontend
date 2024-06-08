import Heading from "../../../micro/Heading/Heading";
import Header from "../../global/header/Header";
import styles from "./ArtistProfilePage.module.scss"
import Footer from "../../global/footer/Footer";

import { LabelDTO } from "../../../../dtos/label.dto";
import { ArtistAccountDTO } from "../../../../dtos/artistAccount.dto";

import { useState, useEffect } from 'react';
import CardAlbum from "../../home/CardAlbum/cardAlbum";
import { AlbumDTO } from "../../../../dtos/album.dto";
import artistAccountServices from "../../../../services/artistAccount.services";
import useHttp from "../../../../hooks/useHttp.hook";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../../store";
import { setArtistData } from "../../../../store/general";
import albumsServices from "../../../../services/albums.services";

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

  const navigate = useNavigate();

  const [label, setLabel] = useState<Array<LabelDTO>>([])
  const [albums, setAlbums] = useState<Array<AlbumDTO>>([])

  const artistAccount = useSelector<RootState, ArtistAccountDTO | undefined>(state => state.general.artistData);

  const fetchArtistAccount = useHttp(artistAccountServices.get);
  const fetchArtistAlbums = useHttp(albumsServices.getByArtistUsername);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const entrypoint = async () => {
      try {
        const response = await fetchArtistAccount();
        dispatch(setArtistData(response.data))
      } catch (error) {
        console.error(error)
        navigate("/artists/register")
      }
    }

    if (!artistAccount) {
      entrypoint();
    }
  }, [])

  const [openAlbum, setOpenAlbum] = useState(false)
  const [openTrack, setOpenTrack] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  let bannerUrl, avatarUrl;

  useEffect(() => {
    if(artistAccount?.artistImages.length === 0) {
      bannerUrl = "https://lumina-sound.s3.sa-east-1.amazonaws.com/images/bannerSemPerfil.svg"
      avatarUrl = "https://lumina-sound.s3.sa-east-1.amazonaws.com/images/fotoSemPerfil.svg"
    } else {
      bannerUrl = artistAccount?.artistImages[1].imageURL
      avatarUrl = artistAccount?.artistImages[0].imageURL
    }

    const fetchContent = async () => {
      try {
        const response = await fetchArtistAlbums(artistAccount?.username);
        setAlbums(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchContent();
  }, [artistAccount])

  return (
    <>
      <Header view="normal" />

      <section className={styles[`profileInfo`]}>
        <img className={styles[`bannerImage`]} src={bannerUrl} />
        <div className={styles[`pictureProfile`]}>
          <img className={styles["avatarProfile"]} src={avatarUrl} />
          <Heading level={1} className={`${styles[`h1Profile`]}`}>{artistAccount?.name}</Heading>
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
                    label.map((label, index) => (
                      <option key={index} value={label.id}>{label.name}</option>
                    ))
                  }
                </select>

                <select name="albuns" id="albuns">
                  <option value="">Selecione o album da música</option>
                  {
                    albums.map((album, index) => (
                      <option key={index} value={album.id}>{album.name}</option>
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
                <p>Criar um novo álbum</p>
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
            albums.map((album, index) => {
              return (
                <CardAlbum
                  key={index}
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
