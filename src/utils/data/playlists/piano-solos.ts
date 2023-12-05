import t1 from "../../../data/compositions/chopin-nocturne-in-e-flat-major.json"
import t2 from "../../../data/compositions/satie-gymnopedie-no-1.json"
import t3 from "../../../data/compositions/beethoven-moonlight-sonata.json"
import t4 from "../../../data/compositions/bach-prelude-no-1-in-c-major.json"
import t5 from "../../../data/compositions/debussy-clair-de-lune.json"
import t6 from "../../../data/compositions/liszt-hungarian-rhapsody-no-2.json"
import t7 from "../../../data/compositions/mozart-rondo-alla-turca.json"
import {ArrayOfDictionaries} from "../../ArrayOfDictionaries"

const tracks = (): any[] =>  {
    return new ArrayOfDictionaries([t1, t2, t3, t4, t5, t6, t7]).get()
}

export default tracks
