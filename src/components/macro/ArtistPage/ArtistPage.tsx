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

const ArtistPage = ({ id }: ArtistPageProps): JSX.Element => {

  const [artist, setArtist] = useState<ArtistAccountDTO | null>(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await getById(Number(id));
        setArtist(response.data);
      } catch (error) {
        console.error('Error fetching artist:', error);
      }
    };
    fetchArtist();
  }, [id]);

  const nome = artist?.name
  const desc = artist?.bio
  //const bannerUrl = artist?.artistImages[0].imageUrl
  //const avatarUrl = artist?.artistImages[1].imageUrl

  return (
    <>
      <Header view="normal" logged={false} />

      <section className={styles[`artistInfo`]}>
        {
          //<img className={styles[`bannerImage`]} src={bannerUrl} />
        //<img className={styles["avatarArtist"]} src={avatarUrl} />
        }
        <article className={styles["textsArtist"]}>
          <Heading level={1}>{nome}</Heading>
          <div className={styles[`verificadoArtista`]}>
            <img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/verificadoArtista.svg" />
            <Heading level={2}>Artista</Heading>
          </div>
          <Heading level={5}>{desc}</Heading>
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
            <TrackRow
              musicUrl="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/songs/Belivier_ImagineDragons.png"
              nameTrack="We Found Love (Album Version)"
              artist="Calvin Harris"
              album="Talk That Talk (Deluxe)"
              time="3:36"
            />
            <TrackRow
              musicUrl="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/songs/Belivier_ImagineDragons.png"
              nameTrack="We Found Love (Album Version)"
              artist="Calvin Harris"
              album="Talk That Talk (Deluxe)"
              time="3:36"
            />
            <TrackRow
              musicUrl="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/songs/Belivier_ImagineDragons.png"
              nameTrack="We Found Love (Album Version)"
              artist="Calvin Harris"
              album="Talk That Talk (Deluxe)"
              time="3:36"
            />
            <TrackRow
              musicUrl="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/songs/Belivier_ImagineDragons.png"
              nameTrack="We Found Love (Album Version)"
              artist="Calvin Harris"
              album="Talk That Talk (Deluxe)"
              time="3:36"
            />
            <TrackRow
              musicUrl="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/songs/Belivier_ImagineDragons.png"
              nameTrack="We Found Love (Album Version)"
              artist="Calvin Harris"
              album="Talk That Talk (Deluxe)"
              time="3:36"
            />
            <TrackRow
              musicUrl="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/songs/Belivier_ImagineDragons.png"
              nameTrack="We Found Love (Album Version)"
              artist="Calvin Harris"
              album="Talk That Talk (Deluxe)"
              time="3:36"
            />
          </tbody>
        </table>
      </section>

      <section className={`${styles[`secMusic`]}`}>
        <Heading level={1} className={`${styles[`h1Artistas`]}`}>Artistas em destaque <img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/playTitulo.svg" /></Heading>
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

export default ArtistPage