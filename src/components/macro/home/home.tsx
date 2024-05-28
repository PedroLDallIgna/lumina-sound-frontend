import Header from "../global/header/Header";
import Banner from "./Banner/Banner"
import Heading from "../../micro/Heading/Heading"
import CardMusic from "./CardMusic/cardMusic";
import CardArtist from "./CardArtist/cardArtist";
import styles from "./Home.module.scss"
import Footer from "../global/footer/Footer";

import { TrackDTO } from "../../../dtos/track.dto";
import { ArtistAccountDTO } from "../../../dtos/artistAccount.dto";
import { useEffect, useState } from "react";
import http from "../../../services/http.service";
//import { getById } from "../../../services/artistAccount.services";


function Home() {

  const [track, setTrack] = useState<Array<TrackDTO>>([]);
  const [artist, setArtist] = useState<Array<ArtistAccountDTO>>([]);

  useEffect(() => {
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

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await http.get<Array<TrackDTO>>(`/tracks`);
        setTrack(response.data);
      } catch (error) {
        console.error('Error fetching track:', error);
      }
    };
    fetchTrack();
  }, []);

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
          {artist.map((artistE) => (
            <CardArtist
            path={`/artists/${artistE.name.replace(" ", "")}/${artistE.id}`}
            id={String(artistE.id)}
            url="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/artists/Danger/Danger.jpg"
            artista={artistE.name}
          />
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Home