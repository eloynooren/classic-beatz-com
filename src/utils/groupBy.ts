declare global {
    interface Array<T> {
        groupBy(key: string): { [key: string]: Array<T> };
    }
}

Array.prototype.groupBy = function (key: string) {
    return this.reduce((result, obj) => {
        // Get the key value from obj
        let keyValue = obj[key];

        // If the key value is not in the result object, add an array for it
        if (!result[keyValue]) {
            result[keyValue] = [];
        }

        // Remove the key-value pair from obj
        let newObj = { ...obj };
        delete newObj[key];

        // Add the new object to the array for this key value
        result[keyValue].push(newObj);

        return result;
    }, {});
};
