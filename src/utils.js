export const dataDecimals = 1 //1.0

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
