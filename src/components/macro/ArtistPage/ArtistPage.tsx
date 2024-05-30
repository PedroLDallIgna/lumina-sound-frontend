import Heading from "../../micro/Heading/Heading";
import Header from "../global/header/Header";
import TrackRow from "../global/TrackRow/TrackRow";
import CardArtist from "../home/CardArtist/cardArtist";
//import Heading from "../../micro/Heading/Heading"
import styles from "./ArtistPage.module.scss"
import Footer from "../global/footer/Footer";

import { ArtistPageProps } from "./ArtistPage.props";
import { useState, useEffect } from 'react';
import { getById } from "../../../services/artistAccount.services";
import { ArtistAccountDTO } from "../../../dtos/artistAccount.dto";
import { TrackDTO } from "../../../dtos/track.dto";
import http from "../../../services/http.service";
import { useParams } from "react-router-dom";

const ArtistPage = ({}: ArtistPageProps): JSX.Element => {

  const [artist, setArtist] = useState<ArtistAccountDTO | null>(null);
  const [artists, setArtists] = useState<Array<ArtistAccountDTO>>([]);
  const [track, setTrack] = useState<Array<TrackDTO>>([]);

  const propURL = useParams();

  useParams()
  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await getById(Number(propURL.id));
        setArtist(response.data);
      } catch (error) {
        console.error('Error fetching artist:', error);
      }
    };
    fetchArtist();
  }, [propURL.id]);
  
  //const bannerUrl = artist?.artistImages[0].imageUrl
  //const avatarUrl = artist?.artistImages[1].imageUrl
  
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

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await http.get("/tracks");
        setTrack(response.data);
      } catch (error) {
        console.error('Error fetching artist:', error);
      }
    };
    fetchTracks();
  }, []);

  const filteredTracks = track.filter((trackE) => {
    return trackE.artists.some((artist) => artist.id == propURL.id);
  });

  return (
    <>
      <Header view="normal" logged={false} />

      <section className={styles[`artistInfo`]}>
        {
        //<img className={styles[`bannerImage`]} src={bannerUrl} />
        //<img className={styles["avatarArtist"]} src={avatarUrl} />
        }
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
            <th></th>
            <th>Música</th>
            <th>Artistas</th>
            <th>Álbum</th>
            <th>Tempo</th>
            <th>Ação</th>
          </thead>
          <tbody>
            {
              filteredTracks.map((track) => (
                <TrackRow
                  musicUrl={track.coverImageUrl}
                  nameTrack={track.title}
                  artistId={String(track.artists[0].id)}
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
            artists.map((artists) => (
              <CardArtist
                id={String(artists.id)}
                path={`/artists/${artists.name.replace(" ", "")}/${artists.id}`}
                url="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/testes/artista.png"
                artista={artists.name}
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