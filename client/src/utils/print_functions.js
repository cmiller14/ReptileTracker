
export function printDate(date) {
    const dateTime = new Date(date);
    return dateTime.toLocaleString();
}

export function printSpecies(reptile) {
    const speciesPrintable = reptile.species.replace('_', " ");
    return speciesPrintable.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
}

export function printSex(reptile) {
    if (reptile.sex == "m") {
        return "Male";
    } else {
        return "Female";
    }
}