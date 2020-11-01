import {average, max, sum} from '../../utils'
import {ClassStatsHelper} from './ClassStatsHelper'
import {KillStreaksHelper} from './KillStreaksHelper'

export class Player {
	constructor(steamID, logInfoObj) {
		this.steamID = steamID

		this._info = null // initNewLog()
		this._isAccuracyEnabled = false // initNewLog()
		this.initNewLog(logInfoObj)

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
		this.mostUsedWeapon = ''

		this.wins = 0
		this.loses = 0
		this.stalemates = 0

		this.accuracy = []
		this.avgAccuracy = 0.0

		this.topWeapons = {} //{scattergun: ClassStatsWeaponHelper}

		this.score = 0
		this.currentMatchScore = 0
		this.currentMatch = {
			kills: null,
			deaths: null,
			assists: null,
			suicides: null,
			dmg: null,
			dmg_real: null,
			dt: null,
			dt_real: null,
			hr: null,
			lks: null,
			as: null,
			dapd: null,
			dapm: null,
			ubers: null,
			ubertypes: null,
			drops: null,
			medkits: null,
			medkits_hp: null,
			backstabs: null,
			headshots: null,
			headshots_hit: null,
			sentries: null,
			heal: null,
			cpc: null,
			ic: null,
		}
		this.medals = {gold: 0, silver: 0, bronze: 0}

		return this
	}

	initNewLog(logInfoObj) {
		this._info = logInfoObj
		this._isAccuracyEnabled = this._info.hasAccuracy || false
	}

	calcValues() {
		this._playTime()
		this._weaponUsage()
		this._score()
	}

	_playTime() {
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

	_weaponUsage() {
		let mostKills = 0
		let mostKillsWeaponName = ''
		for (let gameClass of Object.values(this.class_stats)) {
			let classKillCount = 0
			for (let [name, weapon] of Object.entries(gameClass.weapon)) {
				const killCount = sum(weapon.kills)
				weapon.killCount = killCount
				weapon.avgKillCountPerGame = killCount / weapon.kills.length || 1
				weapon.totalDmg = sum(weapon.dmg)

				this._addTopWeapon(weapon)

				const {hits, shots} = weapon
				let accuracy = hits[hits.length - 1] / shots[shots.length - 1]

				if (accuracy && accuracy !== Infinity) {
					weapon.accuracy.push(accuracy)
					gameClass.accuracy.push(accuracy)
					this.accuracy.push(accuracy)
				} else if (this._isAccuracyEnabled) {
					weapon.accuracy.push(0)
					gameClass.accuracy.push(0)
					this.accuracy.push(0)
				}

				weapon.avgAccuracy = average(weapon.accuracy)

				if (classKillCount === 0) {
					gameClass.mostUsedWeapon = name //for medics without kills
				}
				if (mostKills === 0) {
					mostKillsWeaponName = name //for medics without kills
				}
				if (killCount > classKillCount) {
					classKillCount = killCount
					gameClass.mostUsedWeapon = name
				}
				if (killCount > mostKills) {
					mostKills = killCount
					mostKillsWeaponName = name
				}
			}

			if (gameClass.accuracy.length > 1) {
				gameClass.avgAccuracy = average(gameClass.accuracy)
			}
		}

		if (this.accuracy.length > 1) {
			this.avgAccuracy = average(this.accuracy)
		}

		this.mostUsedWeapon = mostKillsWeaponName
	}

	_addTopWeapon(weapon) {
		this.topWeapons[weapon.name] = weapon
	}

	_score() {
		//https://wiki.teamfortress.com/wiki/Scoreboard#Points
		const score = sum(this.kills) + (sum(this.assists) / 2) + sum(this.cpc) //TODO
		const matchScore = this.currentMatch.kills + (this.currentMatch.assists / 2) + this.currentMatch.cpc

		this.score += score
		this.currentMatchScore = matchScore
	}
}
