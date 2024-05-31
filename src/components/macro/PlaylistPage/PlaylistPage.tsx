import Heading from "../../micro/Heading/Heading";
import Header from "../global/header/Header";
//import TrackRow from "../global/TrackRow/TrackRow";
import CardArtist from "../home/CardArtist/cardArtist";
//import Heading from "../../micro/Heading/Heading"

import styles from "./PlaylistPage.module.scss"
import Footer from "../global/footer/Footer";
import { PlaylistPageProps } from "./PlaylistPage.props";
import { useState, useEffect } from 'react';
//import { ArtistDTO } from "../../../dtos/artist.dto";
import { TrackDTO } from "../../../dtos/track.dto";
import http from "../../../services/http.service";
import { ArtistAccountDTO } from "../../../dtos/artistAccount.dto";
import { PlaylistDTO } from "../../../dtos/playlist.dto";
import { getById } from "../../../services/playlists.services";
import { useParams } from "react-router-dom";
import TrackRow from "../global/TrackRow/TrackRow";
//import Link from "../../micro/Link/Link";

const PlaylistPage = ({ }: PlaylistPageProps): JSX.Element => {
  const propURL = useParams();
  const token = localStorage.getItem("token");

  const [artist, setArtist] = useState<Array<ArtistAccountDTO>>([]);
  const [playlist, setPlaylist] = useState<PlaylistDTO | null>(null);
  const [track, setTrack] = useState<Array<TrackDTO>>([]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await http.get(`/playlists/${propURL.id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        })
        setPlaylist(response.data);
      } catch (error) {
        console.error('Error fetching artist:', error);
      }
    }
    fetchPlaylist();

    const fetchArtist = async () => {
      try {
        const response = await http.get("/artists");
        setArtist(response.data);
      } catch (error) {
        console.error('Error fetching artist:', error);
      }
    };
    fetchArtist();
  }, []);

  return (
    <>
      <Header view="normal" logged={false}/>

      <section className={styles[`playlistInfo`]}>
        <img className={styles[`bannerImage`]} src={playlist?.coverImageUrl} />
          <div>
            <Heading level={1}>{playlist?.name}</Heading>
            <Heading level={3}>{playlist?.description}</Heading>
          </div>
          
          <div className={styles[`btnIniciaPlaylist`]}>
            <Heading level={2}>Iniciar Playlist</Heading>
            <img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/playMusica.svg"/>
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
              playlist?.tracks.map((trackE) => {
                return (
                  <TrackRow
                    musicUrl={trackE.coverImageUrl}
                    nameTrack={trackE.title}
                    artistName={trackE.artists.map((artistE) => artistE.name)}
                    id={trackE.artists[0].id}
                    album={trackE.label.name}
                    time={trackE.length}
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