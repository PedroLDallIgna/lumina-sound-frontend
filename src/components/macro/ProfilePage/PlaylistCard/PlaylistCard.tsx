import { PlaylistCardProps } from "./PlaylistCard.props";
import playlistsServices, { PlaylistRequest } from "../../../../services/playlists.services";

import styles from "./PlaylistCard.module.scss"
import Heading from "../../../micro/Heading/Heading";
import Link from "../../../micro/Link/Link";

import { useEffect, useState } from 'react';
import useHttp from "../../../../hooks/useHttp.hook";

import s3 from "../../../../services/s3.service";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { UserDTO } from "../../../../dtos/user.dto";

const PlaylistCard = ({ id, nomePlaylist, imgUrl, description }: PlaylistCardProps): JSX.Element => {
  const [open, setOpen] = useState(false)
  const currentUser = useSelector<RootState, UserDTO | undefined>(state => state.general.loggedUser)

  const fetchPlaylistDelete = useHttp(playlistsServices.deleteById)
  const updatePlaylist = useHttp(playlistsServices.updateById)

  const messageBuider = (message: string, status: string) => {
    if(localStorage.getItem("message") || localStorage.getItem("status")) {
      localStorage.removeItem("message");
      localStorage.removeItem("status");
    } else {
      localStorage.setItem("message", message)
      localStorage.setItem("status", status)
    }
  }

  const deletePlaylist = async (id: number) => {
    const deleteReq = async () => {
      try {
        await fetchPlaylistDelete(id)
        messageBuider("Playlist excluída com sucesso!", "success")
      } catch (error) {
        console.log(error)
        messageBuider("Erro ao excluir playlist!", "error")
      }
      window.location.reload()
    }
    deleteReq()
  }

  const [formPlaylistData, setformPlaylistData] = useState({
    userId: currentUser?.id,
    name: nomePlaylist,
    description: description ?? "",
    public: true,
    coverImageUrl: null as File | null,
  });

  if (open === false) {
    formPlaylistData.name = nomePlaylist
    formPlaylistData.description = description ?? ""
  }

  const handleInputChangePlaylist = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setformPlaylistData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChangePlaylist = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setformPlaylistData((prevData) => ({
      ...prevData,
      coverImageUrl: file || null,
    }));
  };

  const handleSubmitPlaylist = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let playlistRequest: PlaylistRequest = {
      userId: currentUser?.id ?? 0,
      name: formPlaylistData.name,
      description: formPlaylistData.description,
      public: false
    }

    if (formPlaylistData.coverImageUrl) {
      const fileName = `${formPlaylistData.name.replaceAll(" ", "_")}_${formPlaylistData.coverImageUrl.name.replaceAll(" ", "_")}`
      playlistRequest.coverImageUrl = `https://lumina-sound.s3.sa-east-1.amazonaws.com/images/playlists/${fileName}`;

      const params = {
        Bucket: 'lumina-sound',
        Key: `images/playlists/${fileName}`,
        Body: formPlaylistData.coverImageUrl,
        ContentType: formPlaylistData.coverImageUrl.type,
      }

      try {
        const response = await updatePlaylist(id);

        if (response.request.status === 201) {
          await s3.putObject(params).promise();
          messageBuider("Playlist atualizada com sucesso!", "success")
        } else {
          messageBuider("Erro ao atualizar playlist!", "error")
        }
      } catch (error) {
        messageBuider("Erro ao atualizar playlist!", "error")
      }
    } else {
      try {
        await updatePlaylist(id);
        messageBuider("Playlist atualizada com sucesso!", "success")
      } catch (error) {
        messageBuider("Erro ao atualizar playlist!", "error")
      }
    }
    window.location.reload()
  }
  return (
    <div className={`${styles["playlistCard"]}`}>

      <Link url={`/playlists/${id}`} classe="linkCard">
        <img className={`${styles["imgPlaylist"]}`} src={imgUrl ?? ""} />
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

              <form className={styles[`formModal`]} onSubmit={(e) => {handleSubmitPlaylist(e)}}>
                <input type="hidden" name="userId" value={currentUser?.id} />
                <input type="hidden" name="id" value={id} />

                <input type="text" value={formPlaylistData.name} onChange={handleInputChangePlaylist} name="name" placeholder="Título da Playlist" />
                <input type="text" value={formPlaylistData.description} onChange={handleInputChangePlaylist} name="description" placeholder="Descrição da playlist" />

                <label htmlFor="fotoPlaylist">Foto da Playlist</label>
                <input name="fotoPlaylist" type="file" onChange={handleFileChangePlaylist} accept="image/png, image/gif, image/jpeg" />
                <button className={styles[`btnEditarModal`]}>Editar playlist</button>
              </form>
              <button className={styles[`btnExcluir`]} onClick={() => deletePlaylist(Number(id))}>Excluir playlist</button>
            </section>
          </div>
        )
      }

    </div>
  )
}

export default PlaylistCard