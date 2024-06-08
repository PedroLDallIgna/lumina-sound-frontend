import { PlaylistCardProps } from "./PlaylistCard.props";
import styles from "./PlaylistCard.module.scss"
import Heading from "../../../micro/Heading/Heading";
import Link from "../../../micro/Link/Link";

import { useState } from 'react';

const PlaylistCard = ({ id, nomePlaylist, imgUrl }: PlaylistCardProps): JSX.Element => {
  const [open, setOpen] = useState(false)

  return (
    <div className={`${styles["playlistCard"]}`}>

      <Link url={`/playlists/${id}`} classe="linkCard">
        <img className={`${styles["imgPlaylist"]}`} src={imgUrl} />
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
                <input type="hidden" value={nomePlaylist} />
                <input type="text" placeholder="Título da Playlist" />
                <input type="text" placeholder="Descrição da playlist" />

                <label htmlFor="fotoPlaylist">Foto da Playlist</label>
                <input name="fotoPlaylist" type="file" accept="image/png, image/gif, image/jpeg" />
                <div className={styles[`btns`]}>
                  <button className={styles[`btnEditar`]} >Editar playlist</button>
                  <button className={styles[`btnExcluir`]}>Excluir Playlist</button>
                </div>
               
              </form>
            </section>
          </div>
        )
      }

    </div>
  )
}

export default PlaylistCard