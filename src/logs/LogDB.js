import {max} from '../utils'
import {Winner} from './ProcessLog'

export let DB = {
	players: {}
}

DB.getPlayer = function getPlayer(steamID) {
	return new Promise(resolve => {
		resolve(DB.players[steamID])
	})
}

function ClassStatsHelper() {
	this.type = [] //FIXME
	this.kills = []
	this.deaths = []
	this.assists = []
	this.dmg = []
	this.weapon = {}  //objs,  classStatsWeaponHelper
	this.total_time = []

	this.maxPlaytime = 0
}

let ClassStatsWeaponHelper = function () {
	this.kills = []
	this.dmg = []
	this.avg_dmg = []
	this.shots = []
	this.hits = []
	return this
}
ClassStatsWeaponHelper.prototype.addData = function (data) {
	for (const key of Object.keys(data)) {
		this[key].push(data[key])
	}
}

function KillStreaksHelper() {
	this.steamid = []
	this.streak = []
	this.time = []
}

class Player {
	constructor() {
		this.team = {Red: [], Blue: []}
		this.kills = []
		this.deaths = []
		this.assists = []
		this.suicides = []
		this.kapd = [] //The players kills and assists per death ratio. https://www.teamfortress.tv/42476/logs-tf-api-documentation
		this.kpd = [] //The players kills per death ratio.
		this.dmg = []
		this.dmg_real = []
		this.dt = [] //Amount of the damage the player has taken.
		this.dt_real = []
		this.hr = [] //Amount of healing the player received. info.hasHR. real heals received?
		this.lks = [] //The player’s longest killstreak.
		this.as = [] //Amount of airshots.
		this.dapd = []
		this.dapm = [] //The player's Damage per Minute.
		this.ubers = [] //obj
		this.ubertypes = [] //obj
		this.drops = []
		this.medkits = []
		this.medkits_hp = []
		this.backstabs = []
		this.headshots = []
		this.headshots_hit = []
		this.sentries = [] //sentries built. info.hasSB
		this.heal = [] //heals received. all heals(pickup, medic, dispencer, resupply)? .hr == real heals received?
		this.cpc = [] //capture point caps
		this.ic = [] //intel caps

		this.medicstats = [] //objs

		this.class_stats = {
			scout: new ClassStatsHelper(),
			soldier: new ClassStatsHelper(),
			pyro: new ClassStatsHelper(),
			demoman: new ClassStatsHelper(),
			heavyweapons: new ClassStatsHelper(),
			engineer: new ClassStatsHelper(),
			medic: new ClassStatsHelper(),
			sniper: new ClassStatsHelper(),
			spy: new ClassStatsHelper(),
		}
		this.killstreaks = new KillStreaksHelper() //doesn't contain all killstreaks
		this.maps = []
		this.mapsPlayed = {} // {cp_process_final: 2}

		this.mostPlayedClass = ''
		this.mostPlayedClassPlayTime = 0
		this.mostPlayedMap = ''

		this.wins = 0
		this.loses = 0
		this.stalemates = 0

		return this
	}

	calcValues = () => {
		let maxPlayTime = 0
		let mostPlayed = ''
		for (let gameClassString of Object.keys(this.class_stats)) {
			let currentClass = this.class_stats[gameClassString]
			const playTime = max(currentClass.total_time)

			if (playTime > maxPlayTime) {
				mostPlayed = gameClassString
				maxPlayTime = playTime
			}
		}
		this.mostPlayedClass = mostPlayed
		this.mostPlayedClassPlayTime = maxPlayTime

		let mostTimesPlayed = 0
		let mostTimesPlayedMap = ''
		for (let gameMap of Object.values(this.maps)) {
			let timesPlayed = this.maps.filter(obj => obj === gameMap).length
			this.mapsPlayed[gameMap] = timesPlayed

			if (timesPlayed > mostTimesPlayed) {
				mostTimesPlayedMap = gameMap
				mostTimesPlayed = timesPlayed
			}
		}
		this.mostPlayedMap = mostTimesPlayedMap
	}
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
