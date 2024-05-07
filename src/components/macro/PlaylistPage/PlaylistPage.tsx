import Heading from "../../micro/Heading/Heading";
import Header from "../global/header/Header";
import TrackRow from "../global/TrackRow/TrackRow";
import CardArtist from "../home/CardArtist/cardArtist";
//import Heading from "../../micro/Heading/Heading"

import styles from "./PlaylistPage.module.scss"
import Footer from "../global/footer/Footer";
import { PlaylistPageProps } from "./PlaylistPage.props";
import Link from "../../micro/Link/Link";

const PlaylistPage = ({ }: PlaylistPageProps): JSX.Element => {
  const nome = "As brabas de 2024"
  return (
    <>
      <Header view="normal" logged={false}/>

      <section className={styles[`playlistInfo`]}>
          <Heading level={1}>{nome}</Heading>
          <div className={styles[`btnIniciaPlaylist`]}>
            <Heading level={2}>Iniciar Playlist</Heading>
            <img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/playMusica.svg"/>
          </div>
      </section>

      <section className={styles[`tracksList`]}>
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

export default PlaylistPage