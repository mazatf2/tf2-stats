const fs = require('fs')
const tf_english = require('./tf_english.json').lang.Tokens
const items_game = require('./items_game.json').items_game
const schema1 = require('../steam_api/GetSchemaItems.json')
const schema2 = require('../steam_api/GetSchemaItemsStart1150.json')
const schema3 = require('../steam_api/GetSchemaItemsStart8266.json')
const schema4 = require('../steam_api/GetSchemaItemsStart9299.json')
const schema5 = require('../steam_api/GetSchemaItemsStart10301.json')
const schema6 = require('../steam_api/GetSchemaItemsStart11320.json')
const schema7 = require('../steam_api/GetSchemaItemsStart30748.json')

const schemas = [
	schema1, schema2, schema3, schema4, schema5, schema6, schema7
]

const getItem = (id) => {
	if (!items_game.items[id]) throw id
	return items_game.items[id]
}

const getLogNameFromPrefab = (stringArray) => {
	if (!stringArray) return

	const arr = stringArray.split(' ')
	for (let i of arr) {
		if (items_game.prefabs[i].item_logname) {
			return {logName: items_game.prefabs[i].item_logname, obj: items_game.prefabs[i]}
		}
	}
}

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
const addResult = (name, schemaData, nameSource) => {
	const nameSourceKeys = Object.keys(nameSources)
	if (!nameSourceKeys.includes(nameSource)) throw nameSource

	let result = {
		log_name: name,
		tf_english: getLocalized(schemaData.item_name),
		defindex: schemaData.defindex,
		image_url: schemaData.image_url,
		image_url_large: schemaData.image_url_large,
		item_slot: schemaData.item_slot,
		nameSource: nameSource,
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

const main = (name) => {
	const missing = {}

	for (let schema of schemas) {
		for (let item of schema.result.items) {
			if (['primary', 'secondary', 'melee'].includes(item.item_slot)) {
				const ge = getItem(item.defindex)

				if (ge.item_logname) {
					addResult(ge.item_logname, item, nameSources.item_logname)

				} else if (ge.prefab && getLogNameFromPrefab(ge.prefab)) {
					const {logName, obj} = getLogNameFromPrefab(ge.prefab)
					addResult(logName, item, nameSources.prefab_item_logname)

				} else if (ge.name.match(/^TF_WEAPON_/)) {
					const name = ge.name.split(/^TF_WEAPON_/)[1]
					const logName = name.toLowerCase()
					addResult(logName, item, nameSources.tf_weapon_regexp)

				} else {
					missing[item.defindex] = item
					console.log('automatic logname missing:', item.defindex, item.name) //TODO add missing weapons
				}
			}
		}
	}

	fs.writeFile('weapon_lognames_def.json', JSON.stringify(weaponLogNames, null, '\t'), (err) => {
		if (err) throw err
		console.log('weapon_lognames_def.json done')
	})

	fs.writeFile('weapons_missing_automatic_lognames.json', JSON.stringify(missing, null, '\t'), (err) => {
		if (err) throw err
		console.log('weapons_missing_automatic_lognames.json done')
	})
}
main()
