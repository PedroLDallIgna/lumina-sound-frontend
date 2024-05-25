import Header from "../global/header/Header";
import Banner from "./Banner/Banner"
import Heading from "../../micro/Heading/Heading"

import CardMusic from "./CardMusic/cardMusic";
import CardArtist from "./CardArtist/cardArtist";

import styles from "./Home.module.scss"
import Footer from "../global/footer/Footer";

import { TrackDTO } from "../../../dtos/track.dto";
import { useEffect, useState } from "react";
import http from "../../../services/http.service";

function Home() {

  const [track, setTrack] = useState<Array<TrackDTO>>([]);

  //const id = 1

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await http.get<Array<TrackDTO>>(`/tracks`);
        setTrack(response.data);
      } catch (error) {
        console.error('Error fetching track:', error);
      }
    };
    fetchArtist();
  }, [track]);

  return (
    <>
      <Header view="normal" logged={true} />
      <Banner />

      <section className={`${styles[`secMusic`]}`}>
        <Heading level={1} className={`${styles[`h1Home`]} `}>Ultimos Lançamentos <img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/playTitulo.svg" /></Heading>
        <div className={`${styles[`containerCards`]}`}>
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

      <section className={`${styles[`secMusic`]}`}>
        <Heading level={1} className={`${styles[`h1Home`]}`}>Artistas em destaque <img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/playTitulo.svg" /></Heading>
        <div className={`${styles[`containerCards`]}`}>
          <CardArtist
            url="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/testes/artista.png"
            artista="Imagine Dragons"
          />

          <CardArtist
            url="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/testes/artista.png"
            artista="The Weeknd"
          />

          <CardArtist
            url="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/testes/artista2.png"
            artista="Imagine Dragons"
          />

          <CardArtist
            url="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/testes/artista2.png"
            artista="The Weeknd"
          />

          <CardArtist
            url="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/testes/artista.png"
            artista="Imagine Dragons"
          />
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Home