import React from "react";
import OneButtonAudioPlayer from "./one_button_audio_player";
import {Track} from './track'

interface CompositionListProps {
    title?: string;
    tracks: Track[];
}

const CompositionList: React.FC<CompositionListProps> = ({title, url, src}) => {
    return (
        <div>
            <table style={{width: '100%'}}>
                <tbody>
                <tr>
                    <td style={{width: '30px'}}>
                        <OneButtonAudioPlayer src={src}/>
                    </td>
                    <td>
                        <NavLink to={url}>
                            {title}
                        </NavLink>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default CompositionList;
