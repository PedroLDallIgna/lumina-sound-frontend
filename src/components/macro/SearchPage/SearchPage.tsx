import { Link, useLocation } from "react-router-dom"
import useHttp from "../../../hooks/useHttp.hook"
import searchServices from "../../../services/search.services"
import Footer from "../global/footer/Footer"
import Header from "../global/header/Header"
import { useEffect, useState } from "react"
import { SearchResponse } from "../../../types/searchResponse.type"
import styles from "./SearchPage.module.scss"
import TrackRow from "../global/TrackRow/TrackRow"

const SearchPage = () => {

  const [searchData, setSearchData] = useState<SearchResponse>();
  const location = useLocation();

  const search = useHttp(searchServices.search);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await search(location.state.keyword)
        setSearchData(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetch()
  }, [location])

  useEffect(() => {
    console.log(searchData)
  }, [searchData])

  return (
    <>
      <Header view="normal" />

      <main className={styles.searchPage}>
        <div className={[styles.defaultSection, styles.tracksSection].join(" ")}>
          <h2>Tracks</h2>
          {!!searchData?.foundTracks.length
            ? (
              <table className={styles.tableTracks}>
                <tbody>
                  {searchData?.foundTracks.map(track =>
                    <TrackRow track={track} />
                  )}
                </tbody>
              </table>
            ) : <div className={styles.notFound}>Nenhuma track encontrada</div>
          }
        </div>
        <div className={[styles.defaultSection, styles.artistsSection].join(" ")}>
          <h2>Artistas</h2>
          {!!searchData?.foundArtists.length
            ? (
              <div className={styles.artistItem}>
                {searchData?.foundArtists.map((artist, index) =>
                  <p>
                    <Link key={artist.id ?? index} to={`/artists/${artist.username}`}>{artist.name}</Link>
                  </p>
                )}
              </div>
            ) : <div className={styles.notFound}>Nenhum artista encontrado</div>
          }
        </div>
        <div className={[styles.defaultSection, styles.albumsSection].join(" ")}>
          <h2>Álbuns</h2>
          {!!searchData?.foundAlbums.length
            ? (
              <div className={styles.albumItems}>
                {searchData?.foundAlbums.map((album, index) =>
                  <p>
                    <Link key={album.id ?? index} to={`/albums/${album.id}`}>{album.name}</Link>
                  </p>
                )}
              </div>
            ) : <div className={styles.notFound}>Nenhum álbum encontrado</div>
          }
        </div>
        <div className={[styles.defaultSection, styles.labelsSection].join(" ")}>
          <h2>Gravadoras</h2>
          {!!searchData?.foundLabels.length
            ? (
              <div className="class">
                {searchData?.foundLabels.map(label =>
                  <p>{label.name}</p>
                )}
              </div>
            ) : <div className={styles.notFound}>Nenhuma gravadora encontrada</div>
          }
        </div>
      </main>

      <Footer />
    </>
  )
}

export default SearchPage
