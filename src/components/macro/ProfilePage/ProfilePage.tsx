import Heading from "../../micro/Heading/Heading";
import Header from "../global/header/Header";
import styles from "./ProfilePage.module.scss"
import Footer from "../global/footer/Footer";

import PlaylistCard from "./PlaylistCard/PlaylistCard";
import { useState, useEffect } from 'react';
import { PlaylistDTO } from "../../../dtos/playlist.dto";

import useHttp from "../../../hooks/useHttp.hook";
import playlistsServices, { PlaylistRequest } from "../../../services/playlists.services";
import usersServices from "../../../services/users.services";
import s3 from "../../../services/s3.service";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { UserDTO } from "../../../dtos/user.dto";
import MessageResult from "../../micro/MessageResult/MessageResult";

const ProfilePage = (): JSX.Element => {

  useEffect(() => {
    setTimeout(() => {
      localStorage.removeItem("message")
      localStorage.removeItem("status")
    }, 1000)
  }, [])

  const messageBuider = (message: string, status: string) => {
    if (localStorage.getItem("message") || localStorage.getItem("status")) {
      localStorage.removeItem("message");
      localStorage.removeItem("status");
    } else {
      localStorage.setItem("message", message)
      localStorage.setItem("status", status)
    }
  }

  const currentUser = useSelector<RootState, UserDTO | undefined>(state => state.general.loggedUser)

  if (currentUser === undefined) {
    window.location.href = "/login"
  }

  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const [playlists, setPlaylists] = useState<Array<PlaylistDTO>>([])

  const createPlaylist = useHttp(playlistsServices.create)
  const updateUser = useHttp(usersServices.updateById);
  const fetchUserPlaylists = useHttp(playlistsServices.getUserPlaylists)

  const [formPlaylistData, setformPlaylistData] = useState({
    userId: currentUser?.id ?? 0,
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

      console.log(playlistRequest, params, s3)

      try {
        const response = await createPlaylist(playlistRequest);
        if (response.request.status === 201) {
          await s3.putObject(params).promise();
          messageBuider("Playlist criada com sucesso!", "success")
        } else {
          messageBuider("Erro ao criar playlist!", "error")
        }
      } catch (error) {
        messageBuider("Erro ao criar playlist!", "error")
      }
    } else {
      try {
        await createPlaylist(playlistRequest);
        messageBuider("Playlist criada com sucesso!", "success")
      } catch (error) {
        messageBuider("Erro ao criar playlist!", "error")
      }
    }

    window.location.reload()
  }


  const [formEditUser, setFormEditUser] = useState({
    id: currentUser?.id ?? 0,
    name: currentUser?.name ?? '',
    email: currentUser?.email ?? '',
    birthDate: currentUser?.birthDate ?? '',
    sex: currentUser?.sex ?? '',
    username: currentUser?.username ?? '',
    password: currentUser?.password ?? '',
    userImages: [
      {
        imageType: 'PROFILE',
        imageURL: currentUser?.userImages[0]?.imageURL ?? ''
      },
      {
        imageType: 'BANNER',
        imageURL: currentUser?.userImages[1]?.imageURL ?? ''
      }
    ],
    profileImage: null as File | null, 
    bannerImage: null as File | null
  });

  const handleInputChangeUser = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormEditUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChangeProfileUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFormEditUser((prevData) => ({
      ...prevData,
      profileImage: file || null,
    }));
  };

  const handleFileChangeBannerUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFormEditUser((prevData) => ({
      ...prevData,
      bannerImage: file || null,
    }));
  };

  const handleSubmitUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(formEditUser.id)

    let userRequest: UserDTO = {
      id: formEditUser.id,
      name: formEditUser.name,
      email: formEditUser.email,
      birthDate: formEditUser.birthDate,
      sex: formEditUser.sex,
      username: formEditUser.username,
      password: formEditUser.password,
      userImages: [
        {
          imageType: 'PROFILE',
          imageURL: formEditUser.userImages[0].imageURL
        },
        {
          imageType: 'BANNER',
          imageURL: formEditUser.userImages[1].imageURL
        }
      ]
    };

    if (formEditUser.profileImage || formEditUser.bannerImage) {
      const fileProfileName = `${formEditUser.name.replaceAll(" ", "_")}_${formEditUser.profileImage?.name.replaceAll(" ", "_")}`;
      const fileBannerName = `${formEditUser.name.replaceAll(" ", "_")}_${formEditUser.bannerImage?.name.replaceAll(" ", "_")}`;
      userRequest.userImages[0].imageURL = `https://lumina-sound.s3.sa-east-1.amazonaws.com/images/users/${fileProfileName}`;
      userRequest.userImages[1].imageURL = `https://lumina-sound.s3.sa-east-1.amazonaws.com/images/users/${fileBannerName}`;
    
      const ProfileParams = {
        Bucket: 'lumina-sound',
        Key: `images/users/${fileProfileName}`,
        Body: formEditUser.profileImage,
        ContentType: formEditUser.profileImage?.type,
      };

      const BannerParams = {
        Bucket: 'lumina-sound',
        Key: `images/users/${fileBannerName}`,
        Body: formEditUser.bannerImage,
        ContentType: formEditUser.bannerImage?.type,
      };

      console.log(ProfileParams, BannerParams)
      console.log(userRequest)

      try {
        const response = await updateUser(userRequest);
        if (response.request.status === 201) {
          await s3.putObject(ProfileParams).promise();
          await s3.putObject(BannerParams).promise();
          messageBuider("Imagens atualizadas com sucesso!", "success");
        } else {
          messageBuider("Erro ao atualizar perfil!", "error");
        }
      } catch (error) {
        messageBuider("Erro ao atualizar perfil!", "error");
      }
    } else {
      try {
        await updateUser(userRequest);
        messageBuider("Perfil atualizado com sucesso!", "success");
      } catch (error) {
        messageBuider("Erro ao atualizar perfil!", "error");
      }
    }

    //window.location.reload();
  };

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

  if (currentUser) {
    if (currentUser.userImages.length === 0) {
      bannerUrl = "https://lumina-sound.s3.sa-east-1.amazonaws.com/images/bannerSemPerfil.svg"
      avatarUrl = "https://lumina-sound.s3.sa-east-1.amazonaws.com/images/fotoSemPerfil.svg"
    } else {
      bannerUrl = currentUser?.userImages[1].imageURL ?? ""
      avatarUrl = currentUser?.userImages[0].imageURL ?? ""
    }
    console.log(bannerUrl, avatarUrl)
  }

  return (
    <>
      <Header view="normal" />

      {
        !!localStorage.getItem("message") && !!localStorage.getItem("status") && (
          <MessageResult message={localStorage.getItem("message") ?? ""} status={localStorage.getItem("status") ?? ""} />
        )
      }

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

              <form action="post" className={styles[`formModal`]} onSubmit={handleSubmitUser}>
                <label htmlFor="avatarProfile">Avatar do perfil (350px x 350px)</label>
                <input name="avatarProfile" type="file" accept="image/png, image/gif, image/jpeg" onChange={handleFileChangeProfileUser} />

                <label htmlFor="bannerProfile">Banner do perfil (1440px x 350px)</label>
                <input name="bannerProfile" type="file" accept="image/png, image/gif, image/jpeg" onChange={handleFileChangeBannerUser} />

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
                  description={playlist.description}
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
                <input id="userId" type="hidden" name="userId" value={currentUser?.id} />
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