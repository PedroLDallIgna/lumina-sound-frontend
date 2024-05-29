import { PlaylistCardProps } from "./PlaylistCard.props";
import styles from "./PlaylistCard.module.scss"
import Heading from "../../../micro/Heading/Heading";
import Link from "../../../micro/Link/Link";

import { useState } from 'react';
//import Link from "../../../micro/Link/Link";
/*
import { useState, useEffect } from 'react';
import http from "../../../services/http.service";
import { useParams } from "react-router-dom";
*/

const PlaylistCard = ({ nomePlaylist }: PlaylistCardProps): JSX.Element => {
  const [open, setOpen] = useState(false)

  return (
    <div className={`${styles["playlistCard"]}`}>
      <Link url={`/playlists/${nomePlaylist.trim().replaceAll(" ", "")}`} classe="linkCard">
        <img className={`${styles["imgPlaylist"]}`} src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/artists/ImagineDragons/ImagineDragons.jpg" />
        <Heading level={1} className={`${styles["playlistName"]}`}>{nomePlaylist}</Heading>
      </Link>
      <a className={`${styles["btnEditar"]}`} onClick={() => setOpen(!open)}>Editar Playlist</a>

      {
        open && (
          <div className={styles[`fundoModal`]}>
            <section className={styles[`modalAddAlbum`]}>
              <div className={styles[`topModal`]}>
                <p>Editar {nomePlaylist}</p>
                <p className={styles[`closeModal`]} onClick={() => setOpen(!open)}>X</p>
              </div>

              <form action="post" className={styles[`formModal`]}>
              <input type="text" placeholder="Título da Playlist" />

                <label htmlFor="fotoPlaylist">Foto da Playlist</label>
                <input name="fotoPlaylist" type="file" accept="image/png, image/gif, image/jpeg" />
                <button>Editar playlist</button>
              </form>
            </section>
          </div>
        )
      }
    </div>
  )
}

export default PlaylistCard