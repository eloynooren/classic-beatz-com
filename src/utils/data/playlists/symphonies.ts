import t1 from "../../../data/compositions/beethoven-symphony-no-5.json"
import t2 from "../../../data/compositions/beethoven-symphony-no-9.json"
import t3 from "../../../data/compositions/tchaikovsky-symphony-no-6.json"
import t4 from "../../../data/compositions/mahler-symphony-no-5.json"
import t5 from "../../../data/compositions/dvorak-symphony-no-9.json"
import t6 from "../../../data/compositions/mozart-symphony-no-40.json"
import t7 from "../../../data/compositions/brahms-symphony-no-1.json"
import {ArrayOfDictionaries} from "../../ArrayOfDictionaries"

const tracks = (): any[] =>  {
    return new ArrayOfDictionaries([t1, t2, t3, t4, t5, t6, t7]).get()
}

export default tracks
