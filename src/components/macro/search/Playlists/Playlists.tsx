import Heading from "../../../micro/Heading/Heading";
import Header from "../../global/header/Header";
import styles from "../Musics/Musics.module.scss"
import Footer from "../../global/footer/Footer";

import { useState, useEffect } from "react";

import useHttp from "../../../../hooks/useHttp.hook";
import ArtistServices from "../../../../services/artists.services";
import { ArtistAccountDTO } from "../../../../dtos/artistAccount.dto";
import CardArtist from "../../home/CardArtist/cardArtist";

const Playlists = (): JSX.Element => {

  const fetchPlaylists = useHttp(.get);
  const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser') || '') : undefined
  const [playlists, setPlaylists] = useState<Array<ArtistAccountDTO>>([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchPlaylists();
        setPlaylists(response.data);
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

      <section className={styles[`ArtistList`]}>
        <Heading level={1} className={`${styles[`h1Home`]}`}>Todas as suas Playlists<img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/playTitulo.svg" /></Heading>
        <div className={styles[`ArtistGrid`]}>
        {
            Artist.map((artistE, index) => (
              <CardArtist
              key={index}
              path={`/artists/${artistE.name.replace(" ", "")}/${artistE.id}`}
              id={String(artistE.id)}
              url={artistE.artistImages[0].imageURL}
              artista={artistE.name}
            />
            ))
          }
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Playlists