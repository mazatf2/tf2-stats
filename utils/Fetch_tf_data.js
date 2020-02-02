const fetch = require('node-fetch')
const vdf = require('simple-vdf')
const fs = require('fs')

fetch('https://raw.githubusercontent.com/SteamDatabase/GameTracking-TF2/master/tf/scripts/items/items_game.txt')
	.then(res => res.text())
	.then((data) => {
		let obj = vdf.parse(data)
		fs.writeFile('items_game.json', JSON.stringify(obj, null, '\t'), (err) => {
			if (err) throw err
			console.log('items_game.json done')
		})
	})

fetch('https://raw.githubusercontent.com/SteamDatabase/GameTracking-TF2/master/tf/resource/tf_english.txt')
	.then(res => res.text())
	.then((data) => {
		let obj = vdf.parse(data)
		fs.writeFile('tf_english.json', JSON.stringify(obj, null, '\t'), (err) => {
			if (err) throw err
			console.log('tf_english.txt done')
		})
	})

