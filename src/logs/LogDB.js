import {Winner} from './ProcessLog'
import {Player} from './Player/Player'
import {ClassStatsWeaponHelper} from './Player/ClassStatsWeaponHelper'

export let DB = {
	players: {}
}

DB.getPlayer = function getPlayer(steamID) {
	return new Promise(resolve => {
		resolve(DB.players[steamID])
	})
}

class LogDB {
	constructor() {
		window.db = DB //debug
	}

	addPlayer(key) {
		return new Promise((resolve) => {
				if (DB.players[key] === undefined) {
					DB.players[key] = new Player()
				}
				resolve(DB)
			}
		)

	}

	addKillStreaksEntry(steamID, obj) {
		return new Promise(resolve => {
			for (let [key, value] of Object.entries(obj)) {
				//console.log(obj, key, value)
				DB.players[steamID].killstreaks[key].push(value)
			}
			resolve(DB)
		})
	}

	addPlayerEntry(steamID, obj, winner) {
		return new Promise(resolve => {
			for (let [key, value] of Object.entries(obj)) {
				if (key === 'class_stats') { //obj
					Object.values(value).forEach((i) => {
						//innerKey = type, kills, innerValue = medic, 9
						for (let [innerKey, innerValue] of Object.entries(i)) {
							const gameClass = i.type
							//debugger;
							if (innerKey === 'weapon') {
								const weaponsObj = innerValue
								for (let [weapon, weaponData] of Object.entries(weaponsObj)) {
									let entry = DB.players[steamID].class_stats[gameClass]['weapon'][weapon]
									if (!entry) {
										entry = DB.players[steamID].class_stats[gameClass]['weapon'][weapon] = new ClassStatsWeaponHelper()
									}
									entry.addData(weaponData)

								}

							} else {
								DB.players[steamID].class_stats[gameClass][innerKey].push(innerValue)
							}
						}
					})
				} else if (key === 'kpd' || key === 'kapd') {
					DB.players[steamID][key].push(Number(value))
				} else if (key === 'team') {
					if (value === 'Red') {
						DB.players[steamID].team.Red.push(value)
					}
					if (value === 'Blue') {
						DB.players[steamID].team.Blue.push(value)
					}
					if (winner === value) {
						DB.players[steamID].wins += 1
					} else if (winner === Winner.stalemate) {
						DB.players[steamID].stalemates += 1
					} else {
						DB.players[steamID].loses += 1
					}
				} else {
					DB.players[steamID][key].push(value)
				}

			}
			resolve(DB)
		})
	}

	addInfoEntry(steamID, obj) {
		return new Promise(resolve => {
			console.log(12)
			DB.players[steamID].maps.push(obj.info['map'])
			DB.players[steamID].calcValues()
			resolve(DB)
		})
	}

	getDB() {
		return new Promise(resolve => resolve(DB))
	}

	getPlayer(steam3ID) {
		return new Promise(resolve => resolve(DB.players[steam3ID]))
	}

	onDBUpdate(callback) {
		callback(DB)
	}

}

export default LogDB
