import { Menu, MenuButton, MenuItem, SubMenu } from "@szhsin/react-menu"
import styles from "./TrackRow.module.scss"
import { TrackRowProps } from "./TrackRow.props"

import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import '@szhsin/react-menu/dist/theme-dark.css'
import useHttp from "../../../../hooks/useHttp.hook"
import playlistsServices from "../../../../services/playlists.services"
import { PlaylistDTO } from "../../../../dtos/playlist.dto"
import { useEffect, useState } from "react"

const TrackRow = ({musicUrl, nameTrack, artistName, album, time, trackId}: TrackRowProps): JSX.Element => {

  const [userPlaylists, setUserPlaylists] = useState<PlaylistDTO[]>()

  const uploadTrackToPlaylist = useHttp(playlistsServices.addTrack);
  const fetchUserPlaylists = useHttp(playlistsServices.getUserPlaylists);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchUserPlaylists();
        setUserPlaylists(response.data)
      } catch (error) {
        console.error(error)
      } 

      }
    fetch()
  }, [])

  const onAddToPlaylist = async (playlistId: number) => {
    try {
      await uploadTrackToPlaylist({playlistId, trackId})
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <tr className={styles[`trackRow`]}>
      <td><img src={musicUrl}/></td>
      <td>{nameTrack}</td>
      <td><a href={`/artists/${artistName}`}>{artistName}</a></td>
      <td>{album}</td>
      <td>{time}</td>
      <td>
        <Menu menuButton={<MenuButton><img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/actionBtn.svg"/></MenuButton>}>
          <SubMenu label="Adicionar à playlist">
            {userPlaylists?.map(playlist => <MenuItem key={playlist.id} onClick={() => onAddToPlaylist(playlist.id)}>{playlist.name}</MenuItem>)}
          </SubMenu>
        </Menu>
        </td>
    </tr>
  )
}

export default TrackRow