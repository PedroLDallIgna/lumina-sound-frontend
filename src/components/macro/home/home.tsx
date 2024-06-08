import Header from "../global/header/Header";
import Banner from "./Banner/Banner"
import Heading from "../../micro/Heading/Heading"
import CardMusic from "./CardMusic/cardMusic";
import CardArtist from "./CardArtist/cardArtist";
import styles from "./Home.module.scss"
import Footer from "../global/footer/Footer";

import { useEffect, useState } from "react";
import tracksServices from "../../../services/tracks.services";
import artistServices from "../../../services/artists.services";
import { ArtistDTO } from "../../../dtos/artist.dto";
import { TrackResponse } from "../../../types/trackResponse.type";

function Home() {

  const [tracks, setTracks] = useState<Array<TrackResponse>>([]);
  const [artists, setArtists] = useState<Array<ArtistDTO>>([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await artistServices.get();
        setArtists(response.data);
      } catch (error) {
        console.error('Error fetching artist:', error);
      }

      try {
        const response = await tracksServices.get();
        setTracks(response.data);
      } catch (error) {
        console.error('Error fetching track:', error);
      }
    };
    fetch();
  }, []);

  console.log(tracks)

  return (
    <>
      <Header view="normal" />

      {!!tracks.length &&
        <Banner track={tracks[0]} />
      }

      <section className={`${styles[`secMusic`]}`}>
        <Heading level={1} className={`${styles[`h1Home`]} `}>Ultimos Lançamentos <img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/playTitulo.svg" /></Heading>
        <div className={`${styles[`containerCards`]}`}>
          {
            tracks.slice(0, 5).map((track, index) => (
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

      <section className={`${styles[`secMusic`]}`}>
        <Heading level={1} className={`${styles[`h1Home`]}`}>Artistas em destaque <img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/playTitulo.svg" /></Heading>
        <div className={`${styles[`containerCards`]}`}>
          {artists.slice(0, 5).map((artist, index) => (
            <CardArtist
              key={index}
              path={`/artists/${artist.name.replace(" ", "")}/${artist.id}`}
              id={String(artist.id)}
              url={artist.artistImages[0].imageURL}
              artista={artist.name}
            />
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Home