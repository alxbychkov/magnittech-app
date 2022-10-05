export function toDate(value) {
    const date = new Date(value);
    return date.toLocaleDateString();
}