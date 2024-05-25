import { BannerProps } from './Banner.props'
import styles from './Banner.module.scss'
import Link from '../../../micro/Link/Link';
import Heading from '../../../micro/Heading/Heading';

import { useState, useEffect } from 'react';
import { getById } from "../../../../services/tracks.services";
import { TrackDTO } from "../../../../dtos/track.dto";

const Banner = ({}: BannerProps): JSX.Element => {

    const [track, setTrack] = useState<TrackDTO | null>(null);

    const id = 1

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await getById(Number(id));
        setTrack(response.data);
      } catch (error) {
        console.error('Error fetching track:', error);
      }
    };
    fetchArtist();
  }, [id]);

  

    return (
        <article className={`${styles[`bannerHome`]}`}>
            <div className={`${styles[`infosBanner`]}`}>
                <div>
                    <Heading level={2}>{track?.title}</Heading>
                    <Heading level={3}>{track?.genre.genrePicUrl}</Heading>
                </div>
                <Link classe="btnBanner" url={`http://localhost:5173/artists/${id}`}>Play</Link>
            </div>
        </article>
    )
}

export default Banner;
