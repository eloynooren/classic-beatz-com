
function pickRandom<T>(arr: T[], n?: number): T[] | T {
    if (n !== undefined && n > arr.length) {
        throw new Error("Cannot pick more elements than the array length.");
    }

    const shuffled = [...arr];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return n === undefined ? shuffled[0] : shuffled.slice(0, n);
}

export default pickRandom
