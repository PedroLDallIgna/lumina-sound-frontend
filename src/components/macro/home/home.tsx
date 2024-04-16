import Header from "../global/header/Header";
import Banner from "./Banner/Banner"
import Heading from "../../micro/Heading/Heading"

import styles from "./Home.module.scss"

function Home() {
  return (
    <>
      <Header view="normal"/>
      <Banner />

      <section className={`${styles[`secMusic`]}`}>
        <Heading level={1} className={`${styles[`h1Home`]}`}>Ultimos Lançamentos</Heading>
      </section>
      
    </>
  )
}

export default Home