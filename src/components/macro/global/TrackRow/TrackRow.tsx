import { Menu, MenuButton, MenuItem, SubMenu } from "@szhsin/react-menu"
import { Link } from "react-router-dom"
import styles from "./TrackRow.module.scss"
import { TrackRowProps } from "./TrackRow.props"

import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import '@szhsin/react-menu/dist/theme-dark.css'

import useHttp from "../../../../hooks/useHttp.hook"
import playlistsServices from "../../../../services/playlists.services"
import { PlaylistDTO } from "../../../../dtos/playlist.dto"
import { useEffect, useState } from "react"
import { TrackResponse } from "../../../../types/trackResponse.type"
import { useAppDispatch } from "../../../../store"
import { addTrackToQueue } from "../../../../store/general"

const TrackRow = ({musicUrl, nameTrack, artistName, album, time, trackId, track}: TrackRowProps): JSX.Element => {

  const dispatch = useAppDispatch();
  
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

  const onAddToQueue = (track: TrackResponse | undefined) => {
    dispatch(addTrackToQueue(track ?? {} as TrackResponse))
  }

  return (
    <tr className={styles[`trackRow`]}>
      <td><img src={track?.coverImageUrl ?? musicUrl}/></td>
      <td>{track?.title ?? nameTrack}</td>
      <td>
        {track?.artists.length
          ? track?.artists.map((artist, index) => 
            <>
              <Link key={artist.id ?? index} to={`/artists/${artist.username}`}>{artist.name}</Link>
              {index !== track.artists.length - 1 && ', '}
            </>
          ) : artistName
        }
      </td>
      <td>{album}</td>
      <td>{track?.length ?? time}</td>
      <td>
        <Menu theming="dark" menuButton={<MenuButton className={styles[`btnAddToPlaylist`]}><img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/actionBtn.svg"/></MenuButton>}>
          <SubMenu label="Adicionar à playlist">
            {userPlaylists?.map(playlist => <MenuItem key={playlist.id} onClick={() => onAddToPlaylist(Number(playlist.id))}>{playlist.name}</MenuItem>)}
          </SubMenu>
          <MenuItem onClick={() => onAddToQueue(track)}>Adicionar à fila</MenuItem>
        </Menu>
        </td>
    </tr>
  )
}

export default TrackRow