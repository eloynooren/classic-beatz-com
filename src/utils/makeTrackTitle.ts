import  {Track} from '../types/Track'


function makeTrackTitle(track: Track) {
    return track.composer + "'s " + track.composition
}

export default makeTrackTitle
