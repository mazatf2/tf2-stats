const fs = require('fs')
const tf_english = require('./tf_english.json').lang.Tokens
const items_game = require('./items_game.json').items_game.items
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
	if (!items_game[id]) throw id
	return items_game[id]
}

const getLocalized = (name) => {
	name = name.replace('#', '')
	if (!tf_english[name]) throw name
	return tf_english[name]
}

let result = {}
const addResult = (name, schemaData) => {
	result[name] = {
		log_name: name,
		tf_english: getLocalized(schemaData.item_name),
		defindex: schemaData.defindex,
		image_url: schemaData.image_url,
		image_url_large: schemaData.image_url_large
	}
}

const main = (name) => {
	for (let schema of schemas) {
		for (let item of schema.result.items) {
			if (['primary', 'secondary', 'melee'].includes(item.item_slot)) {
				const ge = getItem(item.defindex)

				if (ge.item_logname) {
					addResult(ge.item_logname, item)

				} else if (ge.name.match(/^TF_WEAPON_/)) {
					const name = ge.name.split(/^TF_WEAPON_/)[1]
					const logName = name.toLowerCase()
					addResult(logName, item)

				} else {
					console.log(ge.name) //TODO add missing weapons
				}
			}
		}
	}
	fs.writeFile('weapon_lognames_def.json', JSON.stringify(result, null, '\t'), (err) => {
		if (err) throw err
		console.log('done')
	})
}

main()
