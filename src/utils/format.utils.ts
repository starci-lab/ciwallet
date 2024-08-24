import numeral from "numeral"

export const NUMBER_PATTERN = "0.0000a"

export enum NumberPattern {
  First = "0.00000a",
}

export const formatNumber = (
    value: number,
    pattern: NumberPattern = NumberPattern.First
) => {
    return numeral(value).format(pattern)
}

export const truncateString = (
    address: string,
    start: number = 6,
    end: number = 4
) => {
    if (address.length < start + end) {
        return address
    }
    if (end === 0) return `${address.slice(0, start)}...`
    return `${address.slice(0, start)}...${address.slice(-end)}`
}
