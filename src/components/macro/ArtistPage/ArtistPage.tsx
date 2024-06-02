import Heading from "../../micro/Heading/Heading";
import Header from "../global/header/Header";
import TrackRow from "../global/TrackRow/TrackRow";
import CardArtist from "../home/CardArtist/cardArtist";
//import Heading from "../../micro/Heading/Heading"
import styles from "./ArtistPage.module.scss"
import Footer from "../global/footer/Footer";

import { ArtistPageProps } from "./ArtistPage.props";
import { useState, useEffect } from 'react';
import { ArtistAccountDTO } from "../../../dtos/artistAccount.dto";
import { TrackDTO } from "../../../dtos/track.dto";
import http from "../../../services/http.service";
import { useParams } from "react-router-dom";

import * as artistServices from "../../../services/artistAccount.services";
import tracksServices from "../../../services/tracks.services";
import useHttp from "../../../hooks/useHttp.hook";

const ArtistPage = ({}: ArtistPageProps): JSX.Element => {

  const [artist, setArtist] = useState<ArtistAccountDTO | null>(null);
  const [artists, setArtists] = useState<Array<ArtistAccountDTO>>([]);
  const [tracks, setTracks] = useState<Array<TrackDTO>>([]);

  const fetchArtist = useHttp(artistServices.getById)
  const fetchTracks = useHttp(tracksServices.getAll)

  const params = useParams();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchArtist(Number(params.id));
        setArtist(response.data);
      } catch (error) {
        console.error('Error fetching artist:', error);
      }

      try {
        const response = await fetchTracks();
        const filteredTracks = response.data.filter((track: TrackDTO) => {
          return track.artists.some((artist) => artist.id == params.id);
        });
        setTracks(filteredTracks);
      } catch (error) {
        console.error('Error fetching artist:', error);
      }
    };
    fetch();
  }, [params.id]);
  
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await http.get("/artists");
        setArtists(response.data);
      } catch (error) {
        console.error('Error fetching artist:', error);
      }
    };
    fetchArtists();
  }, []);

  var bannerUrl = ""
  var avatarUrl = ""

  if (artist?.artistImages.length === 0) {
    bannerUrl = ""
    avatarUrl = ""
  } else {
    // bannerUrl = artist?.artistImages[1].imageURL ?? ""
    avatarUrl = artist?.artistImages[0].imageURL ?? ""
  }

  return (
    <>
      <Header view="normal" />

      <section className={styles[`artistInfo`]}>
        
        <img className={styles[`bannerImage`]} src={bannerUrl} />
        <img className={styles["avatarArtist"]} src={avatarUrl} />

        <article className={styles["textsArtist"]}>
          <Heading level={1}>{artist?.name}</Heading>
          <div className={styles[`verificadoArtista`]}>
            <img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/verificadoArtista.svg" />
            <Heading level={2}>Artista</Heading>
          </div>
          <Heading level={5}>{artist?.bio}</Heading>
        </article>
      </section>

      <section className={styles[`tracksList`]}>
        <Heading level={1} className={`${styles[`h1Home`]}`}>Discografia<img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/playTitulo.svg" /></Heading>

        <table className={styles[`tableTracks`]}>
          <thead>
            <tr>
              <th></th>
              <th>Música</th>
              <th>Artistas</th>
              <th>Álbum</th>
              <th>Tempo</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {
              tracks.map((track, index) => (
                <TrackRow
                  key={index}
                  trackId={track.id}
                  musicUrl={track.coverImageUrl}
                  nameTrack={track.title}
                  artistId={track.artists[0].id}
                  artistName={String(track.artists[0].name)}
                  album={track.label.name}
                  time={track.length.toString()}
                />
              ))
            }
          </tbody>
        </table>
      </section>

      <section className={`${styles[`secMusic`]}`}>
        <Heading level={1} className={`${styles[`h1Artistas`]}`}>Artistas em destaque <img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/playTitulo.svg" /></Heading>
        <div className={`${styles[`containerCards`]}`}>
          {
            artists.map((artists, index) => (
              <CardArtist
                key={index}
                id={String(artists.id)}
                path={`/artists/${artists.name.replace(" ", "")}/${artists.id}`}
                url={artists.artistImages[0].imageURL}
                artista={artists.name ?? ""}
              />
            ))
          }
        </div>
      </section>

      <Footer />
    </>
  )
}

export default ArtistPage