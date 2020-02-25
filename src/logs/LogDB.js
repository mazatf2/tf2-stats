import {Winner} from './ProcessLog'
import {Player} from './Player/Player'
import {ClassStatsWeaponHelper} from './Player/ClassStatsWeaponHelper'

class LogDB {
	constructor() {
		this.DB = {
			players: {},
			getPlayer: function getPlayer(steamID) {
				return new Promise(resolve => {
					resolve(this.DB.players[steamID])
				})
		}}
		window.db = this.DB //debug
	}

	addPlayer(steamID, logInfoObj) {
		return new Promise((resolve) => {
				if (this.DB.players[steamID] === undefined) {
					this.DB.players[steamID] = new Player(steamID, logInfoObj)
				}
				resolve(this.DB)
			}
		)

	}

	addKillStreaksEntry(steamID, obj) {
		return new Promise(resolve => {
			for (let [key, value] of Object.entries(obj)) {
				//console.log(obj, key, value)
				this.DB.players[steamID].killstreaks[key].push(value)
			}
			resolve(this.DB)
		})
	}

	appendPlayerEntry(steamID, obj, winner) {
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
								for (let [weaponName, weaponData] of Object.entries(weaponsObj)) {
									let entry = this.DB.players[steamID].class_stats[gameClass]['weapon'][weaponName]
									if (!entry) {
										entry = this.DB.players[steamID].class_stats[gameClass]['weapon'][weaponName] = new ClassStatsWeaponHelper(weaponName)
									}
									entry.addData(weaponData)

								}

							} else {
								this.DB.players[steamID].class_stats[gameClass][innerKey].push(innerValue)
							}
						}
					})
				} else if (key === 'kpd' || key === 'kapd') {
					this.DB.players[steamID][key].push(Number(value))
				} else if (key === 'team') {
					if (value === 'Red') {
						this.DB.players[steamID].team.Red.push(value)
					}
					if (value === 'Blue') {
						this.DB.players[steamID].team.Blue.push(value)
					}
					if (winner === value) {
						this.DB.players[steamID].wins += 1
					} else if (winner === Winner.stalemate) {
						this.DB.players[steamID].stalemates += 1
					} else {
						this.DB.players[steamID].loses += 1
					}
				} else {
					this.DB.players[steamID][key].push(value)
					this.DB.players[steamID].currentMatch[key] = value
				}

			}
			resolve(this.DB)
		})
	}

	preCalcValues(steamID, obj) {
		return new Promise(resolve => {
			this.DB.players[steamID].maps.push(obj.info['map'])
			this.DB.players[steamID].calcValues()
			resolve(this.DB)
		})
	}

	getDB() {
		return new Promise(resolve => resolve(this.DB))
	}

	getPlayer(steam3ID) {
		return new Promise(resolve => resolve(this.DB.players[steam3ID]))
	}

	onDBUpdate(callback) {
		callback(this.DB)
	}

}

export default LogDB
