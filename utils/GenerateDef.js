const output = '../src/images/'

const fs = require('fs')
const tf_english = require('./tf_english.json').lang.Tokens
const tf_items = require('./items_game.json').items_game
const schema1 = require('../src/steam_api/GetSchemaItems.json')
const schema2 = require('../src/steam_api/GetSchemaItemsStart1150.json')
const schema3 = require('../src/steam_api/GetSchemaItemsStart8266.json')
const schema4 = require('../src/steam_api/GetSchemaItemsStart9299.json')
const schema5 = require('../src/steam_api/GetSchemaItemsStart10301.json')
const schema6 = require('../src/steam_api/GetSchemaItemsStart11320.json')
const schema7 = require('../src/steam_api/GetSchemaItemsStart30748.json')

const schemas = [
	schema1, schema2, schema3, schema4, schema5, schema6, schema7
]

const getSchemaItem = (defindex) => {
	for (let schema of schemas) {
		const item = schema.result.items.find(obj => obj.defindex === defindex)
		if (item) return item
	}
	throw `${defindex} not found from schema`
}

//items_game.txt items
const getTFItem = (id) => {
	if (!tf_items.items[id]) throw id
	return tf_items.items[id]
}

//items_game.txt prefabs
const getLogNameFromTFPrefab = (stringArray) => {
	if (!stringArray) return

	const arr = stringArray.split(' ')
	for (let i of arr) {
		if (tf_items.prefabs[i].item_logname) {
			return {logName: tf_items.prefabs[i].item_logname, obj: tf_items.prefabs[i]}
		}
	}
}

//tf_english.txt tokens
const getLocalized = (name) => {
	name = name.replace('#', '')
	if (!tf_english[name]) throw name
	return tf_english[name]
}

let nameSources = {
	item_logname: 'item_logname',
	prefab_item_logname: 'prefab_item_logname',
	manual: 'manual',
	tf_weapon_regexp: 'tf_weapon_regexp'
}
let weaponLogNames = {}
let missingWeaponLogNames = {}

const addWeapon = (name, schemaData, nameSource) => {
	const nameSourceKeys = Object.keys(nameSources)
	if (!nameSourceKeys.includes(nameSource)) throw nameSource

	let item_name = schemaData.item_name
	if (item_name === '#TF_Unique_Achievement_Flaregun') {
		item_name = '#TF_Unique_Achievement_FlareGun'
	}

	let result = {
		log_name: name,
		logname_source: nameSource,
		tf_english: getLocalized(item_name),
		defindex: schemaData.defindex,
		image_url: schemaData.image_url,
		image_url_large: schemaData.image_url_large,
		item_slot: schemaData.item_slot,
		item_class: schemaData.item_class,
		item_type_name: schemaData.item_type_name,
	}

	Object.entries(result).forEach(([key, value]) => {
		if (!value && value !== 0) {
			throw `invalid key: ${key}, value: ${value} (typeof: ${typeof value})`
		}
	})

	weaponLogNames[name] = result
}

const addMissingWeapon = (name, defindex) => {
	addWeapon(name, getSchemaItem(defindex), nameSources.manual)

	if (!missingWeaponLogNames[defindex]) {
		missingWeaponLogNames[defindex] = {...getSchemaItem(defindex), ...{is_weapon_added_manually_to_def: false}} //FIXME
	}
	missingWeaponLogNames[defindex].is_weapon_added_manually_to_def = true
}

const main = (name) => {
	for (let schema of schemas) {
		for (let item of schema.result.items) {
			if (['primary', 'secondary', 'melee'].includes(item.item_slot)) {
				const ge = getTFItem(item.defindex)

				if (ge.item_logname) {
					addWeapon(ge.item_logname, item, nameSources.item_logname)

				} else if (ge.prefab && getLogNameFromTFPrefab(ge.prefab)) {
					const {logName, obj} = getLogNameFromTFPrefab(ge.prefab)
					addWeapon(logName, item, nameSources.prefab_item_logname)

				} else if (ge.name.match(/^TF_WEAPON_/)) {
					const name = ge.name.split(/^TF_WEAPON_/)[1]
					const logName = name.toLowerCase()
					addWeapon(logName, item, nameSources.tf_weapon_regexp)

				} else {
					missingWeaponLogNames[item.defindex] = {...item, ...{is_weapon_added_manually_to_def: false}}
					console.log('automatic logname missing:', item.defindex, item.item_slot, item.name) //TODO add missing weapons
				}
			}
		}
	}

	//utils/item_lognames tf2 plugin/item_lognames.txt
	//https://wiki.alliedmods.net/Team_fortress_2_item_definition_indexes

	//Rocket Launcher
	addMissingWeapon('tf_projectile_rocket', 18)
	//The Direct Hit
	addMissingWeapon('rocketlauncher_directhit', 127)

	//Grenade Launcher
	addMissingWeapon('tf_projectile_pipe', 19,)
	//Stickybomb Launcher
	addMissingWeapon('tf_projectile_pipe_remote', 20)

	//Flare Gun
	addMissingWeapon('flaregun', 39)

	//Huntsman
	addMissingWeapon('tf_projectile_arrow', 56)
	//TODO check if 1092 Fortified Compound is needed?

	fs.writeFile(output + 'weapon_lognames_def.js', JSON.stringify(weaponLogNames, null, '\t'), (err) => {
		if (err) throw err
		console.log('weapon_lognames_def.js done')
	})

	fs.writeFile('weapons_missing_automatic_lognames.json', JSON.stringify(missingWeaponLogNames, null, '\t'), (err) => {
		if (err) throw err
		console.log('weapons_missing_automatic_lognames.json done')
	})
}
main()
