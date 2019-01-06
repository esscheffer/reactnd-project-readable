export function sortFunction(sortField) {
    return (a, b) => b[sortField] - a[sortField]
}