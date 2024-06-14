import { Outlet } from "react-router-dom"
import Player from "./components/macro/global/Player/Player"

function App() {
  return (
    <>
      <Outlet />
      <Player />
    </>
  )
}

export default App
