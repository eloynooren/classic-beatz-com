import t1 from "../../../data/tracks/mozart-eine-kleine-nachtmusik.json"
import t2 from "../../../data/tracks/beethoven-fur-elise.json"
import t3 from "../../../data/tracks/vivaldi-spring-four-seasons.json"
import t4 from "../../../data/tracks/bach-toccata-and-fugue-in-d-minor.json"
import t5 from "../../../data/tracks/handel-hallelujah.json"
import t6 from "../../../data/tracks/tchaikovsky-piano-concerto-no-1.json"
import t7 from "../../../data/tracks/verdi-aida.json"
import {ArrayOfDictionaries} from "../../ArrayOfDictionaries"

const homePage = (): any[] =>  {
    return new ArrayOfDictionaries([t1, t2, t3, t4, t5, t6, t7]).get()
}

export default homePage
