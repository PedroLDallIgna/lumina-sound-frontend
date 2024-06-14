import Heading from "../../../micro/Heading/Heading";
import Header from "../../global/header/Header";
import styles from "./Artists.module.scss"
import Footer from "../../global/footer/Footer";

import { useState, useEffect } from "react";

import useHttp from "../../../../hooks/useHttp.hook";
import CardArtist from "../../home/CardArtist/cardArtist";
import artistsServices from "../../../../services/artists.services";
import { ArtistAccountDTO } from "../../../../dtos/artistAccount.dto";

const Artists = (): JSX.Element => {
  
  const [artists, setArtists] = useState<Array<ArtistAccountDTO>>([]);

  const fetchArtists = useHttp(artistsServices.get);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchArtists();
        setArtists(response.data);
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
        <Heading level={1} className={`${styles[`h1Home`]}`}>Todas os nossos artistas<img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/playTitulo.svg" /></Heading>
        <div className={styles[`MusicGrid`]}>
        {
            artists.map((artist, index) => (
              <CardArtist
              key={index}
              path={`/artists/${artist.name.replace(" ", "")}`}
              id={String(artist.id)}
              url={artist.artistImages.length > 0 ? artist.artistImages[0].imageURL : ""}
              artista={artist.name}
            />
            ))
          }
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Artists