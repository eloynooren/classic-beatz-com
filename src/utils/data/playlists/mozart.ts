import t1 from "../../../data/compositions/mozart-piano-concerto-no-21.json"
import t2 from "../../../data/compositions/mozart-die-zauberflote.json"
import t3 from "../../../data/compositions/mozart-requiem.json"
import t4 from "../../../data/compositions/mozart-symphony-no-40.json"
import t5 from "../../../data/compositions/mozart-le-nozze-di-figaro.json"
import t6 from "../../../data/compositions/mozart-rondo-alla-turca.json"
import t7 from "../../../data/compositions/mozart-don-giovanni.json"
import t8 from "../../../data/compositions/mozart-eine-kleine-nachtmusik.json"
import {ArrayOfDictionaries} from "../../ArrayOfDictionaries"

const tracks = (): any[] =>  {
    return new ArrayOfDictionaries([t1, t2, t3, t4, t5, t6, t7, t8]).get()
}

export default tracks
