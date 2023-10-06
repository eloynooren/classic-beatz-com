import shuffleArray from "./shuffleArray";
import pickRandom from "./pickRandom";
import {Pair} from "../types/Pair";



export class PairsMaker {
    private _inputs = {}

    add(type, a, bDict) {
        if (type in this._inputs) {
            this._inputs[type] = {a: bDict}
        } else {
            this._inputs[type][a] = bDict
        }
    }

    get(numRounds: number) {
        let chosen = {}
        let rounds = []

        while (1) {
            for (let type in this._inputs) {
                let aList = Object.keys(this._inputs[type])
                let indicesA = shuffleArray(Array.from({ length: aList.length }, (_, index) => index))
                let indicesB = shuffleArray(Array.from({ length: aList.length }, (_, index) => index))
                let round = []

                for (let i = 0; i < aList.length; i++) {
                    const a = aList[i]
                    let b = ''

                    while (!(b in chosen)) {
                        b = this._inputs[type][a]
                    }

                    chosen[b] = 1
                    round.push({a: a, indexA: indicesA[i], b: b, indexB: indicesB[i], explanation: this._inputs[type][a][b]})
                }

                rounds.push(round)

                if (rounds.length == numRounds) {
                    return rounds
                }
            }
    }
}

