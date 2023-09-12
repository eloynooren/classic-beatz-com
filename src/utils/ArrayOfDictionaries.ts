type Dictionary = Record<string, any>;

export class ArrayOfDictionaries {
    private arr: Dictionary[];
    private include?: string[];

    constructor(arr: Dictionary[], include?: string[]) {
        this.arr = arr;
        this.include = include;
    }

    public getAsSingleDictionary(key: string): Dictionary {
        return this.arr.reduce((acc, item) => {
            const filteredItem = this.include
                ? Object.fromEntries(Object.entries(item).filter(([k]) => this.include!.includes(k)))
                : item;
            return { ...acc, [item[key]]: filteredItem };
        }, {});
    }

    public get(): Dictionary[] {
        return this.arr.map(item => {
            return this.include
                ? Object.fromEntries(Object.entries(item).filter(([k]) => this.include!.includes(k)))
                : item;
        });
    }
}

