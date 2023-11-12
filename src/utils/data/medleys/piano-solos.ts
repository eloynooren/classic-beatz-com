import t1 from "../../../data/tracks/chopin-nocturne-in-e-flat-major.json"
import t2 from "../../../data/tracks/satie-gymnopedie-no-1.json"
import t3 from "../../../data/tracks/beethoven-moonlight-sonata.json"
import t4 from "../../../data/tracks/bach-prelude-no-1-in-c-major.json"
import t5 from "../../../data/tracks/debussy-clair-de-lune.json"
import t6 from "../../../data/tracks/liszt-hungarian-rhapsody-no-2.json"
import t7 from "../../../data/tracks/mozart-rondo-alla-turca.json"
import {ArrayOfDictionaries} from "../../ArrayOfDictionaries"

const pianoSolos = (): any[] =>  {
    return new ArrayOfDictionaries([t1, t2, t3, t4, t5, t6, t7]).get()
}

export default pianoSolos
