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
import albumsServices, { AlbumRequest } from "../../../../services/albums.services";

import { useForm } from "react-hook-form"
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import labelsServices from "../../../../services/labels.services";
import { GenreDTO } from "../../../../dtos/genre.dto";
import genresServices from "../../../../services/genres.services";
import Input from "../../../micro/Input/Input";
import artistsServices from "../../../../services/artists.services";
import { ArtistDTO } from "../../../../dtos/artist.dto";
import tracksServices, { TrackRequest } from "../../../../services/tracks.services";
import { TrackResponse } from "../../../../types/trackResponse.type";
import s3 from "../../../../services/s3.service";
import { AlbumTrackDTO } from "../../../../dtos/albumTrack.dto";
import { AxiosResponse } from "axios";

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

const trackSchema = yup.object().shape({
  title: yup.string().required(),
  released: yup.string().required(),
  length: yup.number().required(),
  bpm: yup.number().required(),
  key: yup.string().required(),
  albumId: yup.number().required(),
  labelId: yup.number().required(),
  genreId: yup.number().required(),
  artistsIds: yup.array(yup.number().required()).optional(),
  trackFile: yup.mixed<FileList>().required().test('file', 'trackFile is required', (value) => value.length > 0),
  coverImage: yup.mixed<FileList>().required().test('file', 'coverImage is required', (value) => value.length > 0),
})

type TrackCreateFormValues = yup.InferType<typeof trackSchema>;

const albumSchema = yup.object().shape({
  name: yup.string().required(),
  albumImage: yup.mixed<FileList>().required().test('file', 'albumImage is required', (value) => value.length > 0),
})

type AlbumCreateFormValues = yup.InferType<typeof albumSchema>;

const ArtistProfilePage = (): JSX.Element => {

  const trackForm = useForm<TrackCreateFormValues>({ resolver: yupResolver(trackSchema) });
  const albumForm = useForm<AlbumCreateFormValues>({ resolver: yupResolver(albumSchema) });

  const navigate = useNavigate();

  const [labels, setLabels] = useState<Array<LabelDTO>>([])
  const [albums, setAlbums] = useState<Array<AlbumDTO>>([])
  const [genres, setGenres] = useState<Array<GenreDTO>>([])
  const [artists, setArtists] = useState<Array<ArtistDTO>>([])

  const artistAccount = useSelector<RootState, ArtistAccountDTO | undefined>(state => state.general.artistData);

  const fetchArtistAccount = useHttp(artistAccountServices.get);
  const fetchArtistAlbums = useHttp(albumsServices.getByArtistUsername);
  const fetchLabels = useHttp(labelsServices.get);
  const fetchGenres = useHttp(genresServices.getAll);
  const fetchArtists = useHttp(artistsServices.get);
  const uploadTrack = useHttp(tracksServices.upload);
  const setTrackAlbum = useHttp(albumsServices.addTrack);
  const createAlbum = useHttp(albumsServices.create);

  const onTrackValidationSuccess = async (data: TrackCreateFormValues) => {
    const requestData: TrackRequest = {
      id: null,
      title: data.title,
      bpm: data.bpm,
      key: data.key,
      genreId: data.genreId,
      length: data.length,
      labelId: data.labelId,
      released: data.released,
      artistsIds: [artistAccount?.id],
      url: "",
      coverImageUrl: ""
    }

    if (data.artistsIds) {
      if (data.artistsIds.length > 0) {
        if (!data.artistsIds.includes(0)) {
          requestData.artistsIds.push(...data.artistsIds)
        }
      }
    }

    const trackFilename = `${requestData.title.replace(" ", "_")}_${requestData.released}`
    requestData.url = `https://lumina-sound.s3.sa-east-1.amazonaws.com/tracks/${trackFilename}`;

    const trackParams = {
      Bucket: 'lumina-sound',
      Key: `tracks/${trackFilename}`,
      Body: data.trackFile[0],
      ContentType: data.trackFile[0].type,
    }

    const coverImageFilename = `${requestData.title.replace(" ", "_")}_${data.coverImage[0].name.replace(" ", "_")}`
    requestData.coverImageUrl = `https://lumina-sound.s3.sa-east-1.amazonaws.com/images/tracks/${coverImageFilename}`;

    const coverImageParams = {
      Bucket: 'lumina-sound',
      Key: `images/tracks/${coverImageFilename}`,
      Body: data.coverImage[0],
      ContentType: data.coverImage[0].type,
    }

    try {
      const trackUploadResponse: AxiosResponse<TrackResponse> = await uploadTrack(requestData)
      await setTrackAlbum({ albumId: data.albumId, trackId: trackUploadResponse.data.id } as AlbumTrackDTO)
      if (trackUploadResponse.status === 201) {
        await s3.putObject(trackParams).promise()
        await s3.putObject(coverImageParams).promise()
      }
    } catch (error) {
      console.error(error)
    }

    console.log(data)
    console.log(requestData)
  }

  const onTrackSubmit = trackForm.handleSubmit(onTrackValidationSuccess, (data) => console.log(data))

  const onAlbumValidationSuccess = async (data: AlbumCreateFormValues) => {
    const requestData: AlbumRequest = {
      artistId: artistAccount?.id ?? 0,
      name: data.name
    }

    const albumImageFilename = `${requestData.name.replace(" ", "_")}_${data.albumImage[0].name.replace(" ", "_")}`
    requestData.albumImageUrl = `https://lumina-sound.s3.sa-east-1.amazonaws.com/images/albums/${albumImageFilename}`;

    const albumImageParams = {
      Bucket: 'lumina-sound',
      Key: `images/albums/${albumImageFilename}`,
      Body: data.albumImage[0],
      ContentType: data.albumImage[0].type,
    }

    try {
      await s3.putObject(albumImageParams).promise()
      await createAlbum(requestData)
    } catch (error) {
      console.error(error)
    }

    console.log(data)
    console.log(requestData)
  }

  const onAlbumSubmit = albumForm.handleSubmit(onAlbumValidationSuccess, (data) => console.log(data))

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
    if (artistAccount?.artistImages.length === 0) {
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

    if (artistAccount) fetchContent();
  }, [artistAccount])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchLabels();
        setLabels(response.data)
      } catch (error) {
        console.error(error)
      }

      try {
        const response = await fetchGenres();
        setGenres(response.data)
      } catch (error) {
        console.error(error)
      }

      try {
        const response = await fetchArtists();
        setArtists(response.data)
      } catch (error) {
        console.error(error)
      }

      try {
        const response = await fetchArtistAlbums(artistAccount?.username)
        setAlbums(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    if (openTrack) fetchData()
  }, [openTrack])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchArtists();
        setArtists(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    if (openAlbum) fetchData()
  }, [openAlbum])

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

              <form className={styles[`formModal`]} onSubmit={onTrackSubmit} >
                <Input type="text" id="track-title" campo="Título da Música" classe="inputForm" {...trackForm.register("title")} />
                <Input type="date" id="track-release" campo="Data de lançamento" classe="inputForm" {...trackForm.register("released")} />
                <Input type="number" id="track-bpm" campo="BPM" classe="inputForm" {...trackForm.register("bpm")} />
                <Input type="text" id="track-key" campo="Tom" classe="inputForm" {...trackForm.register("key")} />
                <Input type="number" id="track-length" campo="Comprimento" classe="inputForm" {...trackForm.register("length")} />

                <select id="album" defaultValue={""} {...trackForm.register("albumId")}>
                  <option value="" disabled>Selecione o álbum</option>
                  {
                    albums.map((album, index) => (
                      <option key={index} value={album.id}>{album.name}</option>
                    ))
                  }
                </select>

                <select id="label" defaultValue={""} {...trackForm.register("labelId")}>
                  <option value="" disabled>Selecione a sua gravadora</option>
                  {
                    labels.map((label, index) => (
                      <option key={index} value={label.id}>{label.name}</option>
                    ))
                  }
                </select>

                <select id="genre" defaultValue={""} {...trackForm.register("genreId")}>
                  <option value="" disabled>Selecione o gênero da música</option>
                  {
                    genres.map((genre, index) => (
                      <option key={index} value={genre.id}>{genre.name}</option>
                    ))
                  }
                </select>

                <select id="artists" multiple {...trackForm.register("artistsIds")}>
                  <option value="" disabled>Selecione artistas participantes</option>
                  <option value="0">Nenhum</option>
                  {
                    artists.map((artist, index) => (
                      artist.id !== artistAccount?.id && <option key={index} value={artist.id}>{artist.name}</option>
                    ))
                  }
                </select>

                <label htmlFor="audioTrack">Arquivo da música</label>
                <input type="file" accept="audio/mp3, audio/wav" placeholder="Audio da musica" {...trackForm.register("trackFile")} />

                <label htmlFor="imgTrack">Capa do Single (foto quadrada)</label>
                <input type="file" accept="image/png, image/gif, image/jpeg" placeholder="Foto da música" {...trackForm.register("coverImage")} />

                <button type="submit">Adicionar</button>
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

              <form onSubmit={onAlbumSubmit} className={styles[`formModal`]}>
                <Input type="text" campo="Título do Álbum" classe="inputForm" id="album-name" {...albumForm.register("name")} />

                <label htmlFor="imgTrack">Capa do Álbum</label>
                <input type="file" accept="image/png, image/gif, image/jpeg" placeholder="Foto da música" {...albumForm.register("albumImage")} />

                <button type="submit">Criar álbum</button>
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
