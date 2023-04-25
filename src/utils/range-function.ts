export default function rangeFunction(maxNum: number) {
    return Array.from({ length: maxNum }, (_, i) => i + 1)
}