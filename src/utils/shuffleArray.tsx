function shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = [...array]; // Create a copy of the array

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * shuffledArray.length);

        // Swap the elements at i and randomIndex
        [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
    }

    return shuffledArray;
}

export default shuffleArray;
