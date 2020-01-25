export const dataDecimals = 2

export function sum(array) {
	if (array && array.length > 0)
		return array.reduce((returnSum, val) => returnSum + val)
	if (array && array.length === 0)
		return 0
}

export function max(array) {
	if (array && array.length > 0)
		return Math.max(...array)
	if (array && array.length === 0)
		return 0
}
