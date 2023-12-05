import t1 from "../../../data/compositions/delibes-sylvia.json"
import t2 from "../../../data/compositions/khachaturian-gayane.json"
import t3 from "../../../data/compositions/ponchielli-danza-delle-ore.json"
import t4 from "../../../data/compositions/prokofiev-romeo-and-juliet.json"
import t5 from "../../../data/compositions/ravel-bolero.json"
import t6 from "../../../data/compositions/tchaikovsky-nutcracker.json"
import t7 from "../../../data/compositions/tchaikovsky-swan-lake.json"
import c1 from "../../../data/composers/delibes.json"
import c2 from "../../../data/composers/khachaturian.json"
import c3 from "../../../data/composers/ponchielli.json"
import c4 from "../../../data/composers/prokofiev.json"
import c5 from "../../../data/composers/ravel.json"
import c6 from "../../../data/composers/tchaikovsky.json"
import {ArrayOfDictionaries} from "../../ArrayOfDictionaries"
import data from "../../../data/playlists/ballet.json";

export const tracks = (): any[] =>  {
    return new ArrayOfDictionaries([t1, t2, t3, t4, t5, t6, t7]).get()
}

export const composers = (): {} =>  {
    return new ArrayOfDictionaries([c1,c2,c3,c4,c5,c6], ["annotations"]).getAsSingleDictionary("composer")
}

export default tracks
