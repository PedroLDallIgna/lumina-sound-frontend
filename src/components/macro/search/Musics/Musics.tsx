import Heading from "../../../micro/Heading/Heading";
import Header from "../../global/header/Header";
import styles from "./Musics.module.scss"
import Footer from "../../global/footer/Footer";

import { useState, useEffect } from "react";

import { TrackDTO } from "../../../../dtos/track.dto";
import CardMusic from "../../home/CardMusic/cardMusic";
import useHttp from "../../../../hooks/useHttp.hook";
import tracksServices from "../../../../services/tracks.services";

const Musics = (): JSX.Element => {

  const fetchTracks = useHttp(tracksServices.getAll);
  const [tracks, setTracks] = useState<Array<TrackDTO>>([])


  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchTracks();
        setTracks(response.data);
      } catch (error) {
        console.error('Error fetching artist:', error);
        return error
      }
    };
    fetch();
  }, []);

  return (
    <>
      <Header view="normal" />

      <section className={styles[`MusicList`]}>
        <Heading level={1} className={`${styles[`h1Home`]}`}>Todas as nossas Músicas<img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/playTitulo.svg" /></Heading>
        <div className={styles[`MusicGrid`]}>
        {
            tracks.map((track, index) => (
              <CardMusic
                key={index}
                url={track.coverImageUrl}
                nomeMusica={track.title}
                artista={track.artists.map((artist) => artist.name)}
              />
            ))
          }
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Musics