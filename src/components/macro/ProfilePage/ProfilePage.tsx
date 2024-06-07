import Heading from "../../micro/Heading/Heading";
import Header from "../global/header/Header";
import styles from "./ProfilePage.module.scss"
import Footer from "../global/footer/Footer";

import PlaylistCard from "./PlaylistCard/PlaylistCard";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { PlaylistDTO } from "../../../dtos/playlist.dto";

import useHttp from "../../../hooks/useHttp.hook";
import playlistsServices from "../../../services/playlists.services";

import s3 from "../../../services/s3.service";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { UserDTO } from "../../../dtos/user.dto";

const ProfilePage = (): JSX.Element => {

  const currentUser = useSelector<RootState, UserDTO | undefined>(state => state.general.loggedUser)
  const params = useParams()
  
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const [playlists, setPlaylists] = useState<Array<PlaylistDTO>>([])

  const createPlaylist = useHttp(playlistsServices.create)
  const fetchUserPlaylists = useHttp(playlistsServices.getUserPlaylists)

  //const [playlistData, setPlaylistData] = useState<PlaylistDTO | null>(null)
  const [formPlaylistData, setformPlaylistData] = useState({
    userId: params.id || '',
    name: '',
    description: '',
    public: true,
    coverImageUrl: null as File | null,
  });

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

    const formData = new FormData();
    formData.append('userId', formPlaylistData.userId);
    formData.append('name', formPlaylistData.name);
    formData.append('description', formPlaylistData.description || '');
    formData.append('public', formPlaylistData.public ? 'true' : 'false');

    if (formPlaylistData.coverImageUrl) {
      const fileName = `${formPlaylistData.name.replaceAll(" ", "_")}_${formPlaylistData.coverImageUrl.name.replaceAll(" ", "_")}`
      formData.append('coverImageUrl', `https://lumina-sound.s3.sa-east-1.amazonaws.com/images/playlists/${fileName}` || '');
      
      const params = {
        Bucket: 'lumina-sound',
        Key: `images/playlists/${fileName}`,
        Body: formPlaylistData.coverImageUrl,
        ContentType: formPlaylistData.coverImageUrl.type,
      }

      try {
        const response = await createPlaylist(formData);

        if (response.request.status === 201) {
          await s3.putObject(params).promise();
          //console.log('Playlist criada com sucesso!');
        } else {
          console.error('Erro ao criar playlist:', response.status);
        }
      } catch (error) {
        console.error('Erro ao criar playlist:', error);
      }
    }
    window.location.reload()
  }

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await fetchUserPlaylists(currentUser?.username)
        setPlaylists(response.data)
      } catch (error) {
        console.error('Error fetching playlist:', error)
      }
    }
    fetchPlaylist()
  }, []);

  var bannerUrl = ""
  var avatarUrl = ""

  useEffect(() => {
    if (currentUser) {
      if (currentUser.userImages.length === 0) {
        bannerUrl = "https://lumina-sound.s3.sa-east-1.amazonaws.com/images/bannerSemPerfil.svg"
        avatarUrl = "https://lumina-sound.s3.sa-east-1.amazonaws.com/images/fotoSemPerfil.svg"
      } else {
        bannerUrl = currentUser?.userImages[1].imageURL ?? ""
        avatarUrl = currentUser?.userImages[0].imageURL ?? ""
      }
    }
  }, [currentUser])

  return (
    <>
      <Header view="normal" />

      <section className={styles[`profileInfo`]}>
        <img className={styles[`bannerImage`]} src={bannerUrl} />

        <div className={styles[`pictureProfile`]}>
          <img className={styles["avatarProfile"]} src={avatarUrl} />
          <Heading level={1} className={`${styles[`h1Profile`]}`}>{currentUser?.name}</Heading>
        </div>

        <button className={styles[`btnEdit`]} onClick={() => setOpenEdit(!openEdit)}>Editar perfil</button>
      </section>

      {
        openEdit && (
          <div className={styles[`fundoModal`]}>
            <section className={styles[`modalAddAlbum`]}>

              <div className={styles[`topModal`]}>
                <p>Editar imagens do perfil</p>
                <p className={styles[`closeModal`]} onClick={() => setOpenEdit(!openEdit)}>X</p>
              </div>

              <form action="post" className={styles[`formModal`]}>
                <label htmlFor="avatarProfile">Avatar do perfil (350px x 350px)</label>
                <input name="avatarProfile" type="file" accept="image/png, image/gif, image/jpeg" />

                <label htmlFor="bannerProfile">Banner do perfil (1440px x 350px)</label>
                <input name="bannerProfile" type="file" accept="image/png, image/gif, image/jpeg" />

                <button>Editar imagens</button>
              </form>

            </section>
          </div>
        )
      }

      <section className={styles[`playlistList`]}>
        <Heading level={1} className={`${styles[`h1Home`]}`}>Minhas Playlists<img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/playTitulo.svg" /></Heading>
        <div className={styles[`playlistGrid`]}>
          {
            playlists.length === 0 && (
              <Heading level={2} className={`${styles[`titulo0Playlist`]}`}>Nenhuma playlist criada, crie uma nova playlist no botão abaixo</Heading>
            )
          }
          
          {
            playlists.map((playlist, index) => {
              return (
                <PlaylistCard
                  key={index}
                  id={playlist.id}
                  imgUrl={playlist.coverImageUrl}
                  nomePlaylist={playlist.name}
                />
              )
            })
          }
        </div>

        <div className={styles[`containerCreatePlaylist`]}>

          <div className={styles[`btnCreate`]} onClick={() => setOpen(!open)}>
            <p>Criar Playlist</p>
            <img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/addPlaylist.svg" width="20px" />
          </div>

          {
            open && (
              <form className={styles[`formCreatePlaylist`]} onSubmit={handleSubmitPlaylist}>
                <input id="userId" type="hidden" name="userId" value={params.id} />
                <input id="name" type="text" name="name" onChange={handleInputChangePlaylist} value={formPlaylistData.name} placeholder="Nome da playlist" />
                <input id="description" type="text" name="description" onChange={handleInputChangePlaylist} value={formPlaylistData.description} placeholder="Descricão da playlist" />

                <label htmlFor="bannerProfile"><strong>Imagem da playlist</strong> (1440px x 350px)</label>
                <input id="coverImageUrl" onChange={handleFileChangePlaylist} name="coverImageUrl" type="file" accept="image/png, image/gif, image/jpeg" />

                <button type="submit">Criar</button>
              </form>
            )
          }
        </div>
      </section>

      <Footer />
    </>
  )
}

export default ProfilePage