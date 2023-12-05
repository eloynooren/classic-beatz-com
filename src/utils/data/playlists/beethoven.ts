import t1 from "../../../data/compositions/beethoven-violin-concerto-in-d-major.json"
import t2 from "../../../data/compositions/beethoven-appassionata.json"
import t3 from "../../../data/compositions/beethoven-moonlight-sonata.json"
import t4 from "../../../data/compositions/beethoven-fur-elise.json"
import t5 from "../../../data/compositions/beethoven-symphony-no-5.json"
import t6 from "../../../data/compositions/beethoven-symphony-no-6.json"
import t7 from "../../../data/compositions/beethoven-symphony-no-9.json"
import {ArrayOfDictionaries} from "../../ArrayOfDictionaries"

const tracks = (): any[] =>  {
    return new ArrayOfDictionaries([t1, t2, t3, t4, t5, t6, t7]).get()
}

export default tracks
