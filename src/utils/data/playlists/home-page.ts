import t1 from "../../../data/compositions/mozart-eine-kleine-nachtmusik.json"
import t2 from "../../../data/compositions/beethoven-fur-elise.json"
import t3 from "../../../data/compositions/vivaldi-spring-four-seasons.json"
import t4 from "../../../data/compositions/bach-toccata-and-fugue-in-d-minor.json"
import t5 from "../../../data/compositions/handel-hallelujah.json"
import t6 from "../../../data/compositions/tchaikovsky-piano-concerto-no-1.json"
import t7 from "../../../data/compositions/verdi-aida.json"
import {ArrayOfDictionaries} from "../../ArrayOfDictionaries"

const tracks = (): any[] =>  {
    return new ArrayOfDictionaries([t1, t2, t3, t4, t5, t6, t7]).get()
}

export default tracks

