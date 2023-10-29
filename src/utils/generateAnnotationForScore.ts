import pickRandom from "./pickRandom";
import templates from "../data/quiz-templates.json";

export const generateAnnotationForScore = (score, max_score) => {
    const rank = Math.ceil(score * 100 / max_score)
    let group
    let rank_line

    if (rank <= 1) {
        group = 'worst'
        rank_line = "Bottom 1%."
    } else if (rank < 50) {
        group = 'bad'
        rank_line = "You lose to " + String(100-rank) +  "% of other quiz-takers."
    } else if (rank < 90) {
        group = 'reasonable'
        rank_line = "You beat " + String(rank) + "% of other quiz-takers."
    } else if (rank < 99) {
        group = 'good'
        rank_line = "Top " + String(100-rank) + "%."
    } else {
        group = 'best'
        rank_line = "Top 1%."
    }

    let score_jibe = pickRandom(templates.feedback[group]['score-jibe']).replace('SCORE', score)
    let cheer = pickRandom(templates.feedback[group]['cheer'])

    return [score_jibe, rank_line, cheer]
}

