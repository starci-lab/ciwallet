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

export const formatAddress = (address: string) => {
    if (address.length < 10) {
        return address
    }
    return `${address.slice(0, 6)}...${address.slice(-4)}`
}
