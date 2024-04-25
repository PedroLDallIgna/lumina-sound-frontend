import Heading from "../../micro/Heading/Heading";
import Header from "../global/header/Header";
import TrackRow from "../global/TrackRow/TrackRow";
//import Heading from "../../micro/Heading/Heading"

import styles from "./ArtistPage.module.scss"
//import Footer from "../global/footer/Footer";
import { ArtistPageProps } from "./ArtistPage.props";

const ArtistPage = ({ }: ArtistPageProps): JSX.Element => {
  const nome = "Calvin Harris"
  const desc = "Adam Richard Wiles (Dumfries, Dumfries y Galloway, 17 de enero de 1984), más conocido como Calvin Harris, es un cantante, DJ y productor británico. Actualmente ocupa el puesto 18 de los 100 mejores DJ de la revista DJ Magazine. [1]​Su álbum debut, seleccionado por la Industria Fonográfica Británica"
  const bannerUrl = 'https://lumina-sound.s3.sa-east-1.amazonaws.com/images/artists/bannerCalvinHarris.png'
  const avatarUrl = 'https://lumina-sound.s3.sa-east-1.amazonaws.com/images/artists/CalvinHarris.png'

  return (
    <>
      <Header view="normal" />

      <section className={styles[`artistInfo`]}>
        <img className={styles[`bannerImage`]} src={bannerUrl} />

        <img className={styles["avatarArtist"]} src={`${avatarUrl}`} />
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
          <tr>
            <th>Música</th>
            <th>Artistas</th>
            <th>Álbum</th>
            <th>Tempo</th>
            <th>Ação</th>
          </tr>
          <TrackRow
            musicUrl="teste"
            nameTrack="We Found Love (Album Version)"
            artist="Calvin Harris"
            album="Talk That Talk (Deluxe)"
            time="3:36"
          />
          <TrackRow
            musicUrl="teste"
            nameTrack="We Found Love (Album Version)"
            artist="Calvin Harris"
            album="Talk That Talk (Deluxe)"
            time="3:36"
          />
          <TrackRow
            musicUrl="teste"
            nameTrack="We Found Love (Album Version)"
            artist="Calvin Harris"
            album="Talk That Talk (Deluxe)"
            time="3:36"
          />
          <TrackRow
            musicUrl="teste"
            nameTrack="We Found Love (Album Version)"
            artist="Calvin Harris"
            album="Talk That Talk (Deluxe)"
            time="3:36"
          />
          <TrackRow
            musicUrl="teste"
            nameTrack="We Found Love (Album Version)"
            artist="Calvin Harris"
            album="Talk That Talk (Deluxe)"
            time="3:36"
          />
        </table>
      </section>
    </>
  )
}

export default ArtistPage