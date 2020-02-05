import {max, sum} from '../../utils'
import {ClassStatsHelper} from './ClassStatsHelper'
import {KillStreaksHelper} from './KillStreaksHelper'

export class Player {
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
		this.mostUsedWeapon = ''

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

		let mostKills = 0
		let mostKillsWeaponName = ''
		for (let gameClass of Object.values(this.class_stats)) {
			let classKillCount = 0
			for (let [name, weapon] of Object.entries(gameClass.weapon)) {
				const killCount = sum(weapon.kills)
				weapon.killCount = killCount
				weapon.avgKillCountPerGame = killCount / weapon.kills.length || 1
				weapon.totalDmg = sum(weapon.dmg)

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
		}
		this.mostUsedWeapon = mostKillsWeaponName
	}
}
