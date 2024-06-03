import Heading from "../../micro/Heading/Heading";
import Header from "../global/header/Header";
import styles from "./ProfilePage.module.scss"
import Footer from "../global/footer/Footer";

import { ProfilePageProps } from "./ProfilePage.props";
import PlaylistCard from "./PlaylistCard/PlaylistCard.";
import { useState, useEffect } from 'react';
import http from "../../../services/http.service";
import { useParams } from "react-router-dom";

import { UserDTO } from "../../../dtos/user.dto";
import { PlaylistDTO } from "../../../dtos/playlist.dto";
//import { getById } from "../../../services/users.services";

//import { jwtDecode } from "jwt-decode";

import AWS from 'aws-sdk';

const ProfilePage = ({ }: ProfilePageProps): JSX.Element => {

  //localStorage.setItem("token", "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJteUJhY2tlbmQiLCJzdWIiOiIxMiIsImV4cCI6MTcxNzM5NTcwMiwiaWF0IjoxNzE3MzY2OTAyfQ.nq9YAmxFbApIoVNk6RglY-uOYLVbNTyEP94Fwj8ua1htaOEBYpejAUhuQVrVzWTFtowBf28uG6-dPCscHj6pyQ82ThSdSE2wGBzb-K8i_BZgK954r-ueHX1dKSthNV73DJb-bRvW3UMmwQu1pcoURnunNyC_bfl8sC0zg3WyHU6yBQnOgnnrYugDSa6Hf53CoAYFw9YGonCqAC6GaMWImO69eBOTyPcOpzSv-v1wETC0Q-a6AKV34OU4P3ttyT9cWVOmW4Ay9kv2k71kk3-MALP6F_-SE_2F6HsxNFVunGP19ywSwq9BT-S8wfkflaiZUDswNaTepMgS1QbMvPvVwA")
  const token = localStorage.getItem("token")
  const decodedToken = JSON.parse(atob(token!.split('.')[1]));
  console.log(decodedToken.sub)
  const propURL = useParams()

  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const [profile, setProfile] = useState<UserDTO | null>(null)
  const [playlist, setPlaylist] = useState<Array<PlaylistDTO>>([])

  //const [playlistData, setPlaylistData] = useState<PlaylistDTO | null>(null)
  const [formPlaylistData, setformPlaylistData] = useState({
    userId: decodedToken.sub || '',
    name: '',
    description: '',
    public: true,
    coverImageUrl: null as File | null,
  });

  const creds = new AWS.Credentials({
    accessKeyId: ``,
    secretAccessKey: ``,
  });

  var s3 = new AWS.S3({
    region: 'sa-east-1',
    credentials: creds
  });

  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
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
        const response = await http.post('/playlists', formData, headers)

        if (response.request.status === 201) {
          await s3.putObject(params).promise();
          console.log('Playlist criada com sucesso!');
        } else {
          console.error('Erro ao criar playlist:', response.status);
        }
      } catch (error) {
        console.error('Erro ao criar playlist:', error);
      }
    }
    window.location.reload()
  }

  var bannerUrl = ""
  var avatarUrl = ""

  //localStorage.setItem("token", "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJteUJhY2tlbmQiLCJzdWIiOiIxMiIsImV4cCI6MTcxNzQ2NzIyMiwiaWF0IjoxNzE3NDM4NDIyfQ.KQ_yYDl4dBUdSGjvwewW9q_TvfzJc2k3xv_oewQnHDGDiosvGCoqWajmpuyAV3EoIHsMH0hpm4bVt-nV3Nqf8kqXyb2jNeWTLfinPiP3UxTCBFjaMUtOMZbHEJHmes_1qNVCurqR3o5lQyeI-vUHq4IxBZBfyZng8SCvok7_hRjd8u6rO83tScXc0evL1gpqn5bHRE0yLAOlColS1jPAUAyYqWECkdeqmqjomEuHa--ujQPpM_9RwUnyn3OUirZ766QZPJZXbjohPsYe43PuiaLV13JYjRkCvd7Nqzad8MFeJ-RUHAd1qqgtxm1q3-G9mAXQ_wKn6qAQbT65fk_xbw")

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await http.get(`/users`, headers)
        setProfile(response.data)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }
    fetchProfile()

    const fetchPlaylist = async () => {
      try {
        const response = await http.get(`/users/library/playlists`, headers)
        setPlaylist(response.data)
      } catch (error) {
        console.error('Error fetching playlist:', error)
      }
    }
    fetchPlaylist()
  }, []);

  if (profile?.userImages == null) {
    bannerUrl = "https://lumina-sound.s3.sa-east-1.amazonaws.com/images/bannerSemPerfil.svg"
    avatarUrl = "https://lumina-sound.s3.sa-east-1.amazonaws.com/images/fotoSemPerfil.svg"
  } else {
    bannerUrl = profile.userImages[1].imageURL
    avatarUrl = profile.userImages[0].imageURL
  }

  return (
    <>
      <Header view="normal" />

      <section className={styles[`profileInfo`]}>
        <img className={styles[`bannerImage`]} src={bannerUrl} />

        <div className={styles[`pictureProfile`]}>
          <img className={styles["avatarProfile"]} src={avatarUrl} />
          <Heading level={1} className={`${styles[`h1Profile`]}`}>{profile?.name}</Heading>
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
            playlist.map((playlistE) => {
              return (
                <PlaylistCard
                  id={playlistE.id}
                  imgUrl={playlistE.coverImageUrl}
                  nomePlaylist={playlistE.name}
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
                <input id="userId" type="hidden" name="userId" value={propURL.id} />
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