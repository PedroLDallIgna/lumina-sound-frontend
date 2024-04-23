import Header from "../global/header/Header";
import Heading from "../../micro/Heading/Heading"

import styles from "./ArtistPage.module.scss"
import Footer from "../global/footer/Footer";

function ArtistPage() {
  return (
    <>
      <Header view="normal" />

      <section className={styles[`artistInfo`]}>
        <img src=""/>
      </section>

      <Footer />
    </>
  )
}

export default ArtistPage