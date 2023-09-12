export interface QuizItem {
    question: string|[string, {[key: string]: string}];
    answers: string[];                  // First answer is correct one
    type?: 'text' | 'audio';
    link?: string;
    questionAnnotation? : string;
    answerAnnotations? : undefined|string[];
}
