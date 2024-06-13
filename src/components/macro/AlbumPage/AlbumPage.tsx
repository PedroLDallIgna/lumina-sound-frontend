import Heading from "../../micro/Heading/Heading";
import Header from "../global/header/Header";
import CardArtist from "../home/CardArtist/cardArtist";

import styles from "./AlbumPage.module.scss"
import Footer from "../global/footer/Footer";
import { AlbumPageProps } from "./AlbumPage.props";
import { useState, useEffect } from 'react';
import http from "../../../services/http.service";
import { ArtistAccountDTO } from "../../../dtos/artistAccount.dto";
import { AlbumResponse } from "../../../types/albumResponse.type";
import { useParams } from "react-router-dom";
import TrackRow from "../global/TrackRow/TrackRow";
import useHttp from "../../../hooks/useHttp.hook";
import albumServices from "../../../services/albums.services";
import artistsServices from "../../../services/artists.services";

const AlbumPage = ({ }: AlbumPageProps): JSX.Element => {
  const params = useParams();

  const [artists, setArtists] = useState<Array<ArtistAccountDTO>>([]);
  const [album, setAlbum] = useState<AlbumResponse>();

  const fetchAlbum = useHttp(albumServices.getById)
  const fetchArtists = useHttp(artistsServices.get)

  useEffect(() => {
    const fetchA = async () => {
      try {
        const response = await fetchArtists();
        setArtists(response.data);
        console.log(artists)
      } catch (error) {
        console.error('Error fetching artist:', error);
      }
    }
    fetchA();

    const fetch = async () => {
      try {
        const response = await fetchAlbum(params.id)
        setAlbum(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching album:', error)
      }
    }
    fetch();
  }, [params.id]);

  return (
    <>
      <Header view="normal" />

      <section className={styles[`playlistInfo`]}>
        <img className={styles[`bannerImage`]} src={album?.albumImageUrl} />
        <div className={styles[`albumInfo`]}>
          <img src={album?.albumImageUrl} />

          <div>
            <Heading level={1}>{album?.name}</Heading>
            {/* <Heading level={3}>{album?.artistDTO.name ?? ""}</Heading> */}
            <Heading level={3}>{album?.id}</Heading>
          </div>
        </div>

        <div className={styles[`btnIniciaPlaylist`]}>
          <img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/playMusica.svg" />
        </div>
      </section>

      <section className={styles[`tracksList`]}>
        <table className={styles[`tableTracks`]}>
          <thead>
            <th></th>
            <th>Música</th>
            <th>Artistas</th>
            <th>Álbum</th>
            <th>Tempo</th>
            <th>Ação</th>
          </thead>
          <tbody>
            {
              album?.tracks.map((track, index) => {
                return (
                  <TrackRow
                    key={index}
                    trackId={track.id}
                    musicUrl={track.coverImageUrl}
                    nameTrack={track.title}
                    artistName={track.artists.map((artist) => artist.name)}
                    artistId={track.artists[0].id}
                    album={track.label.name}
                    time={track.length}
                  />
                )
              })
            }
          </tbody>
        </table>

      </section>

      <section className={`${styles[`secMusic`]}`}>
        <Heading level={1} className={`${styles[`h1Artistas`]}`}>Artistas em destaque <img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/playTitulo.svg" /></Heading>
        <div className={`${styles[`containerCards`]}`}>
          {artists.slice(0, 5).map((artistE) => (
            <CardArtist
              path={`/artists/${artistE.name.replace(" ", "")}`}
              id={String(artistE.id)}
              url={artistE.artistImages.length > 0 ? artistE.artistImages[0].imageURL : ""}
              artista={artistE.name}
            />
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}

export default AlbumPage