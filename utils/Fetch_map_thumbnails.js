const fetch = require('node-fetch')
const fs = require('fs')
const process = require('process')

const apikey = process.env.APIKEY || ''
const output = '../public/maps/'
const srcImagesPath = '../src/images/maps/'

const season35 = ['cp_granary_pro_rc8',
	'cp_gullywash_final1',
	'cp_process_final',
	'cp_snakewater_final1',
	'cp_sunshine',
	'koth_product_rcx',
	'cp_reckoner_rc2'
]

const fetchImg = (url, name) => {
	return new Promise(resolve => {
		fetch(url)
			.then(res => res.buffer()) //use stream instead
			.then((img) => {
				fs.writeFile(output + name, img, (err) => {
					if (err) throw err
					console.log(name, 'done')
					resolve(name)
				})
			})
	})
}

const main = () => {
	let maplist = {}
	let promises = []

	for (const map of season35) {
		promises.push(
			fetch(`https://teamwork.tf/api/v1/map-stats/mapthumbnail/${map}?key=${apikey}`)
				.then(res => res.json())
				.then((data) => {
					if (data.thumbnail) {
						const url = new URL(data.thumbnail)
						const imageName = /([^\/]*$)/.exec(url.pathname)[0] //map1.jpeg
						if (!imageName) throw imageName

						let apiFormat = imageName.split('.')[1] //jpeg
						let apiName = imageName.split('.')[0] //map1.jpeg ==> map1
						if (apiName !== map) {
							console.warn(map, '==>', apiName)
						}
						maplist[map] = map + '.' + apiFormat

						fetchImg(url, map + '.' + apiFormat)
					} else {
						console.error(map, data.thumbnail)
					}
				})
		)
	}

	Promise.all(promises).then(() => {
			fs.writeFile( srcImagesPath + 'maplist.json', JSON.stringify(maplist, null, '\t'), (err) => {
				if (err) throw err
				console.log('maplist.json done')
			})
		}
	)
}

main()
