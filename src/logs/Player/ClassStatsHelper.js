export class ClassStatsHelper {
	constructor() {
		this.type = [] //FIXME
		this.kills = []
		this.deaths = []
		this.assists = []
		this.dmg = []
		this.weapon = {}  //objs,  classStatsWeaponHelper
		this.total_time = []

		this.maxPlaytime = 0
		this.mostUsedWeapon = ''
	}
}
