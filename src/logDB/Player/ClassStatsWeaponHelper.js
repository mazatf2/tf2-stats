export class ClassStatsWeaponHelper {
	constructor(name) {
		if(!name) throw name

		this.kills = []
		this.dmg = []
		this.avg_dmg = []
		this.shots = []
		this.hits = []

		this.name = name
		this.accuracy = []
		this.avgAccuracy = 0.0
		this.killCount = 0
		this.avgKillCountPerGame = 0.0
		this.totalDmg = 0
	}

	addData(data) {
		for (const key of Object.keys(data)) {
			this[key].push(data[key])
		}
	}
}
