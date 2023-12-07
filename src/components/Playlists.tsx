import React, {ReactElement} from 'react';
import {Link} from "./Layout";
import pianoSolos from "../data/playlists/piano-solos.json";
import symphonies from "../data/playlists/symphonies.json";
import ballet from "../data/playlists/ballet.json";
import bach from "../data/playlists/bach.json";
import mozart from "../data/playlists/mozart.json";
import beethoven from "../data/playlists/beethoven.json";
import * as styles from './Playlists.module.css';

const playLists = [
    pianoSolos,
    symphonies,
    ballet,
    bach,
    mozart,
    beethoven
]
interface PlaylistsProps {
    exclude?: any;
}

export const Playlists: React.FC<PlaylistsProps> = ({exclude}) => {

    return (
        <div className={styles.list}>
            <div>
                {playLists.map((playList, index) => (
                    (!exclude || playList["title"] != exclude) &&
                    <div key={index} className={styles.row}>
                        <Link url={playList['canonical']} arrow={true}>
                            {playList['title']}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Playlists
