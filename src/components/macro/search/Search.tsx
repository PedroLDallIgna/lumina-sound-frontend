import Heading from "../../micro/Heading/Heading";
import Header from "../global/header/Header";
import styles from "./Search.module.scss"
import Footer from "../global/footer/Footer";

import { useState, useEffect } from "react";

import CardMusic from "../home/CardMusic/cardMusic";
import { useParams } from "react-router-dom";

import { SearchResponse } from "../../../types/searchResponse.type";

import searchServices from "../../../services/search.services";
import CardArtist from "../home/CardArtist/cardArtist";
import CardAlbum from "../home/CardAlbum/cardAlbum";

const Search = (): JSX.Element => {

  const params = useParams()
  console.log(params)
  const keyword = params.keyword || ''

  const [search, setSearch] = useState<SearchResponse>({} as SearchResponse)

  useEffect(() => {
    searchServices.search(keyword)
      .then((response) => {
        setSearch(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [params.keyword])

  return (
    <>
      <Header view="normal" />

      <div className={styles[`keyword`]}>
        <Heading level={1}>{params.keyword}</Heading>
      </div>

      <section className={styles[`MusicList`]}>
        <Heading level={1} className={`${styles[`h1Home`]}`}>Músicas<img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/playTitulo.svg" /></Heading>
        <div className={styles[`MusicGrid`]}>
          {
            search.foundTracks.length > 0 && (
               search.foundTracks.map((track, index) => (
              <CardMusic
                key={index}
                url={track.coverImageUrl}
                nomeMusica={track.title}
                artista={track.artists.map((artist) => artist.name)}
              />
            )))
          }
          {
            search.foundTracks.length == 0 && (
              <Heading level={2}>Nenhuma música encontrada</Heading>
            )
          }
        </div>
      </section>

      <section className={styles[`MusicList`]}>
        <Heading level={1} className={`${styles[`h1Home`]}`}>Artistas<img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/playTitulo.svg" /></Heading>
        <div className={styles[`MusicGrid`]}>
          {
            search.foundArtists.length > 0 && (
              search.foundArtists.map((artist, index) => (
              <CardArtist
                key={index}
                path={`/artists/${artist.name.replace(" ", "")}`}
                id={String(artist.id)}
                url={artist.artistImages.length > 0 ? artist.artistImages[0].imageURL : ""}
                artista={artist.name}
              />
            )))}
          {
            search.foundArtists.length == 0 && (
              <Heading level={2}>Nenhum artista encontrado</Heading>
            )
            
          }
        </div>
      </section>

      <section className={styles[`MusicList`]}>
        <Heading level={1} className={`${styles[`h1Home`]}`}>Álbuns<img src="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/playTitulo.svg" /></Heading>
        <div className={styles[`MusicGrid`]}>
          {
            search.foundAlbums.length > 0 && (
              search.foundAlbums.map((album, index) => (
                <CardAlbum
                  key={index}
                  url={album.albumImageUrl}
                  nomeAlbum={album.name}
                  id={String(album.id) ?? ""}
                />
              )))
          }
          {
            search.foundAlbums.length == 0 && (
              <Heading level={2}>Nenhum álbum encontrado</Heading>
            )
            
          }
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Search