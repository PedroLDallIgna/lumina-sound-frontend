import Header from "./components/macro/global/header/Header"
import Banner from "./components/macro/home/Banner/Banner"
import Heading from "./components/micro/Heading/Heading"

function App() {
  return (
    <>
      <Header view="normal"/>
      <Banner />

      <Heading level={1}>Ultimos Lançamentos</Heading>
    </>
  )
}

export default App
