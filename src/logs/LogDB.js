export let DB = {
	players: {}
}
DB.getPlayer = function getPlayer(steamID) {
	return new Promise(resolve => {
		resolve(DB.players[steamID])
	})
}


function classStatsHelper() {
	this.type = [] //FIXME
	this.kills = []
	this.deaths = []
	this.assists = []
	this.dmg = []
	this.weapon = []  //objs
	this.total_time = []
}

function killStreaksHelper() {
	this.steamid = []
	this.streak = []
	this.time = []
}

function player() {
	this.team = []

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
		scout: new classStatsHelper(),
		soldier: new classStatsHelper(),
		pyro: new classStatsHelper(),
		demoman: new classStatsHelper(),
		heavyweapons: new classStatsHelper(),
		engineer: new classStatsHelper(),
		medic: new classStatsHelper(),
		sniper: new classStatsHelper(),
		spy: new classStatsHelper(),
	}
	this.killstreaks = new killStreaksHelper() //doesn't contain all killstreaks
}

class LogDB {
	constructor() {
		window.db = DB
	}

	addPlayer(key) {
		return new Promise((resolve) => {
				if (DB.players[key] === undefined) {
					DB.players[key] = new player()
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
			//console.log(DB)

		})

	}

	addPlayerEntry(steamID, obj) {
		return new Promise(resolve => {
			for (let [key, value] of Object.entries(obj)) {
				if (key === 'class_stats') { //obj
					Object.values(value).forEach((i) => {
						//innerKey = type, kills, innerValue = medic, 9
						for (let [innerKey, innerValue] of Object.entries(i)) {
							DB.players[steamID].class_stats[i.type][innerKey].push(innerValue)
						}
					})
				} else if (key === 'kpd' || key === 'kapd') {
					DB.players[steamID][key].push(Number(value))
				} else {
					DB.players[steamID][key].push(value)
				}

			}
			resolve(DB)
			//console.log(DB)

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
