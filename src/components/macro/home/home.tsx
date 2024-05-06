import Header from "../global/header/Header";
import Banner from "./Banner/Banner"
import Heading from "../../micro/Heading/Heading"

import CardMusic from "./CardMusic/cardMusic";
import CardArtist from "./CardArtist/cardArtist";

import styles from "./Home.module.scss"
import Footer from "../global/footer/Footer";

function Home() {
  return (
    <>
      <Header view="normal" logged={true}/>
      <Banner />

      <section className={`${styles[`secMusic`]}`}>
        <Heading level={1} className={`${styles[`h1Home`]} `}>Ultimos Lançamentos <img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/playTitulo.svg" /></Heading>
        <div className={`${styles[`containerCards`]}`}>
          <CardMusic
            url="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/songs/Belivier_ImagineDragons.png"
            nomeMusica="Believer"
            artista="Imagine Dragons"
          />

          <CardMusic
            url="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/songs/Starboy_TheWeeknd.png"
            nomeMusica="Starboy"
            artista="The Weeknd"
          />

          <CardMusic
            url="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/songs/Belivier_ImagineDragons.png"
            nomeMusica="Believer"
            artista="Imagine Dragons"
          />

          <CardMusic
            url="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/songs/Starboy_TheWeeknd.png"
            nomeMusica="Starboy"
            artista="The Weeknd"
          />

          <CardMusic
            url="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/songs/Belivier_ImagineDragons.png"
            nomeMusica="Believer"
            artista="Imagine Dragons"
          />
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