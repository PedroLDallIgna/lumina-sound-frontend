import Heading from "../../../micro/Heading/Heading";
import Header from "../../global/header/Header";
//import TrackRow from "../global/TrackRow/TrackRow";
//import CardArtist from "../home/CardArtist/cardArtist";
//import Heading from "../../micro/Heading/Heading"
import styles from "./Musics.module.scss"
import Footer from "../../global/footer/Footer";

import { useState, useEffect } from "react";
import { MusicsProps } from "./Musics.props";

import { TrackDTO } from "../../../../dtos/track.dto";
import http from "../../../../services/http.service";
import CardMusic from "../../home/CardMusic/cardMusic";
/*

import { getById } from "../../../services/artistAccount.services";
import { ArtistAccountDTO } from "../../../dtos/artistAccount.dto";

import { useParams } from "react-router-dom";
*/

const Musics = ({ }: MusicsProps): JSX.Element => {

  const [track, setTrack] = useState<Array<TrackDTO>>([])

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await http.get("/tracks");
        setTrack(response.data);
      } catch (error) {
        console.error('Error fetching artist:', error);
        return error
      }
    };
    fetchTracks();
  }, []);

  return (
    <>
      <Header view="normal" logged={false} />

      <section className={styles[`MusicList`]}>
        <Heading level={1} className={`${styles[`h1Home`]}`}>Todas as nossas Músicas<img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/playTitulo.svg" /></Heading>
        <div className={styles[`MusicGrid`]}>
        {
            track.map((trackE) => (
              <CardMusic
                url={trackE.coverImageUrl}
                nomeMusica={trackE.title}
                artista={track.map((trackE) => trackE.artists[0].name)}
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