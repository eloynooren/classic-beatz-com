import t1 from "../../../data/compositions/bach-air-on-the-g-string.json"
import t2 from "../../../data/compositions/bach-cello-suite-no-1-in-g-major-prelude.json"
import t3 from "../../../data/compositions/bach-st-matthews-passion.json"
import t4 from "../../../data/compositions/bach-prelude-no-1-in-c-major.json"
import t5 from "../../../data/compositions/bach-jesu-joy-of-man-s-desiring.json"
import t6 from "../../../data/compositions/bach-goldberg-variations.json"
import t7 from "../../../data/compositions/bach-brandenburg-concerto-no-2.json"
import t8 from "../../../data/compositions/bach-toccata-and-fugue-in-d-minor.json"
import {ArrayOfDictionaries} from "../../ArrayOfDictionaries"

const tracks = (): any[] =>  {
    return new ArrayOfDictionaries([t1, t2, t3, t4, t5, t6, t7, t8]).get()
}

export default tracks
