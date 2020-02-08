import weaponLogNames from './images/weapon_lognames_def.json'

export const dataDecimals = 1 //1.0
export const dataPercentage = 3

export function sum(array) {
	if (array && array.length > 0)
		return array.reduce((returnSum, val) => returnSum + val)
	if (array && array.length === 0)
		return 0
}

export function toFixed(num) {
	if (Number(num))
		return Number(num).toFixed(dataDecimals)
	return 0
}

export function max(array) {
	if (array && array.length > 0)
		return Math.max(...array)
	if (array && array.length === 0)
		return 0
}

export function average(array) {
	if(!array) return 0
	const total = sum(array)
	if(total === 0) return 0
	if (array && array.length > 0)
		return sum(array) / array.length
	if (array && array.length === 0)
		return 0
}

export const humanReadableName ={
	scout: 			'Scout',
	soldier: 		'Soldier',
	pyro: 			'Pyro',

	demoman: 		'Demoman',
	heavyweapons: 	'Heavy',
	engineer: 		'Engineer',

	medic: 			'Medic',
	sniper: 		'Sniper',
	spy: 			'Spy',
}

export const localizedWeapon = (name) => {
	const entry = weaponLogNames[name]
	if (entry) {
		return entry.tf_english
	}
	return name
}

//https://wiki.alliedmods.net/Team_Fortress_2_Weapons#Weapons
export const weaponToSteamApi = {
	tf_projectile_rocket: 'TF_WEAPON_ROCKETLAUNCHER'

}
