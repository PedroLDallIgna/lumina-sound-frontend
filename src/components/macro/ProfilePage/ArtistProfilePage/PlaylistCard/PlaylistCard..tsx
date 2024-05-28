import { PlaylistCardProps } from "./PlaylistCard.props";
import styles from "./PlaylistCard.module.scss"
import Heading from "../../../micro/Heading/Heading";
//import Link from "../../../micro/Link/Link";
/*
import { useState, useEffect } from 'react';
import http from "../../../services/http.service";
import { useParams } from "react-router-dom";
*/

const PlaylistCard = ({}: PlaylistCardProps): JSX.Element => {
  return (
    <div className={`${styles["playlistCard"]}`}>
      <Heading level={1} className={`${styles["playlistName"]}`}>as melhores de 2024</Heading>
      <a href="#" className={`${styles["btnEditar"]}`}>Editar Playlist</a>
    </div>
  )
}

export default PlaylistCard