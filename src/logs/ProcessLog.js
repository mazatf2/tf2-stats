import test1 from '../data/test1.json'
import test2 from '../data/test2.json'
import LogDB from './LogDB'


class ProcessLog {
	constructor() {
		this.db = new LogDB()
	}

	newLog(log, steam3ID) {
		return new Promise(resolve => {

		for (let [steamID, player] of Object.entries(log.players)) {
			//const id = log.players[]

			this.db.addPlayer(steamID)
				.then(() => {
					this.db.addPlayerEntry(steamID, player)
				})
				.then(db => {



				})
		}
			for (let killStreak of log.killstreaks){
				this.db.addKillStreaksEntry(killStreak.steamid, killStreak)

			}
			resolve({db: this.db.getDB(), player: this.db.getPlayer(steam3ID)})


		})
	}
}

export default ProcessLog
