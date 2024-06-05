import Heading from "../../micro/Heading/Heading";
import Header from "../global/header/Header";
import CardArtist from "../home/CardArtist/cardArtist";

import styles from "./PlaylistPage.module.scss"
import Footer from "../global/footer/Footer";
import { PlaylistPageProps } from "./PlaylistPage.props";
import { useState, useEffect } from 'react';
import http from "../../../services/http.service";
import { ArtistAccountDTO } from "../../../dtos/artistAccount.dto";
import { PlaylistDTO } from "../../../dtos/playlist.dto";
import { useParams } from "react-router-dom";
import TrackRow from "../global/TrackRow/TrackRow";
import useHttp from "../../../hooks/useHttp.hook";
import playlistsServices from "../../../services/playlists.services";

const PlaylistPage = ({ }: PlaylistPageProps): JSX.Element => {
  const params = useParams();

  const [artist, setArtist] = useState<Array<ArtistAccountDTO>>([]);
  const [playlist, setPlaylist] = useState<PlaylistDTO | null>(null);

  const fetchPlaylist = useHttp(playlistsServices.getById)
  const fetchArtists = useHttp(http.get)

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchPlaylist(params.id)
        setPlaylist(response.data);
      } catch (error) {
        console.error('Error fetching artist:', error)
      }

      try {
        const response = await fetchArtists("/artists");
        setArtist(response.data);
      } catch (error) {
        console.error('Error fetching artist:', error);
      }
    }
    fetch();
  }, [params.id]);

  return (
    <>
      <Header view="normal"/>

      <section className={styles[`playlistInfo`]}>
        <img className={styles[`bannerImage`]} src={playlist?.coverImageUrl ?? ""} />
        <div>
          <Heading level={1}>{playlist?.name}</Heading>
          <Heading level={3}>{playlist?.description}</Heading>
        </div>

        <div className={styles[`btnIniciaPlaylist`]}>
          <Heading level={2}>Iniciar Playlist</Heading>
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
              playlist?.tracks.map((track, index) => {
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
          {artist.map((artistE) => (
            <CardArtist
              path={`/artists/${artistE.name.replace(" ", "")}/${artistE.id}`}
              id={String(artistE.id)}
              url={artistE.artistImages[0].imageURL}
              artista={artistE.name}
            />
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}

export default PlaylistPage