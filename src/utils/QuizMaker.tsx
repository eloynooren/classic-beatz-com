import  {QuizItem} from '../types/QuizItem'
import  {Track} from '../types/Track'
import shuffleArray from './shuffleArray'
import makeTrackTitle from './makeTrackTitle'

export class QuizMaker {
    private  _quizItems : QuizItem[] = []
    
    private _annotationTemplates = {}

    addTrackLists(tracks: Track[], composerDict: any, quizItemTypes: string[]) {
        let titles = tracks.map(t => makeTrackTitle(t))
        let composers = tracks.map(t => t.composer)
        let compositions = tracks.map(t => t.composition)

        for (const track of tracks) {
            let include_composition_annotation = false
            let include_composer_annotation = false
            const title = makeTrackTitle(track)
            titles = titles.filter(s => s !== title);
            titles.unshift(title)
            composers = composers.filter(e => e !== track.composer)
            composers.unshift(track.composer)
            compositions = compositions.filter(e => e !== track.composition)
            compositions.unshift(track.composition)

            if (quizItemTypes.includes('WHAT-HEAR')) {
                this._quizItems.push({
                    question: 'WHAT-HEAR',
                    questionAnnotation: 'LISTEN',
                    answers: titles,
                    answerAnnotations: titles,
                    type: 'audio',
                    link: track.src
                })
                
                include_composition_annotation = true
            }

            if (quizItemTypes.includes('WHICH-COMPOSER')) {
                this._quizItems.push({
                    question: [ 'WHICH-COMPOSER', ({'COMPOSITION': track.composition})],
                    questionAnnotation: title,
                    answers: composers,
                    answerAnnotations: composers,
                    type: 'text',
                })

                include_composition_annotation = true
                include_composer_annotation = true
            }

            if (quizItemTypes.includes('WHICH-COMPOSITION')) {
                this._quizItems.push({
                    question: [ 'WHICH-COMPOSITION', ({'COMPOSER': track.composer})],
                    questionAnnotation: track.composer,
                    answers: compositions,
                    answerAnnotations: titles,
                    type: 'text',
                })

                include_composition_annotation = true
                include_composer_annotation = true
            }
            
            if (include_composition_annotation) {
                this._annotationTemplates[title] = track.annotations
                this._annotationTemplates[track.composer] = composerDict[track.composer].annotations
            }
        }
    }

    addItems(items: QuizItem[]) {
        this._quizItems.push(...items)
    }

    getItems(): QuizItem[] {
        let items = shuffleArray(this._quizItems)
        return items
    }
    
    getAnnotationTemplates() {
        return this._annotationTemplates
    }
}
