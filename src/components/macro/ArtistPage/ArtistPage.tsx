import Heading from "../../micro/Heading/Heading";
import Header from "../global/header/Header";
import TrackRow from "../global/TrackRow/TrackRow";
import CardArtist from "../home/CardArtist/cardArtist";
import styles from "./ArtistPage.module.scss"
import Footer from "../global/footer/Footer";

import { ArtistPageProps } from "./ArtistPage.props";
import { useState, useEffect } from 'react';
import { ArtistAccountDTO } from "../../../dtos/artistAccount.dto";
import http from "../../../services/http.service";
import { useParams } from "react-router-dom";

import artistServices from "../../../services/artists.services";
import tracksServices from "../../../services/tracks.services";
import useHttp from "../../../hooks/useHttp.hook";
import { TrackResponse } from "../../../types/trackResponse.type";

const ArtistPage = ({ }: ArtistPageProps): JSX.Element => {
  const params = useParams();

  const [artist, setArtist] = useState<ArtistAccountDTO>();
  const [artists, setArtists] = useState<Array<ArtistAccountDTO>>([]);
  const [tracks, setTracks] = useState<Array<TrackResponse>>([]);

  const fetchArtist = useHttp(artistServices.getByUsername)
  const fetchArtistTracks = useHttp(tracksServices.getByArtistUsername)

  var bannerUrl = ""
  var avatarUrl = ""

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchArtist(params.name);
        setArtist(response.data);
      } catch (error) {
        console.error('Error fetching artist:', error);
      }
      
      try {
        const response = await fetchArtistTracks(params.name);
        setTracks(response.data);
      } catch (error) {
        console.error('Error fetching artist:', error);
      }
    };
    fetch();
    console.log(artist)
  }, [params]);

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
    const fetch = async () => {
      try {
        const response = await fetchArtist(params.name);
        setArtist(response.data);
      } catch (error) {
        console.error('Error fetching artist:', error);
      }
    };
    fetch()

  }, [params]);

  if (artist?.artistImages.length == 0) {
    bannerUrl = "https://lumina-sound.s3.sa-east-1.amazonaws.com/images/bannerSemPerfil.svg"
    avatarUrl = "https://lumina-sound.s3.sa-east-1.amazonaws.com/images/fotoSemPerfil.svg"
  } else {
    bannerUrl = artist?.artistImages[1].imageURL ?? ""
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
                  track={track}
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
            artists.slice(0, 5).map((artists, index) => (
              <CardArtist
                key={index}
                id={String(artists.id)}
                path={`/artists/${artists.username}`}
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