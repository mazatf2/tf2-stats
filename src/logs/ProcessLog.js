import LogDB from './LogDB'

export const Winner = {
	red: 'Red',
	blue: 'Blue',
	stalemate: 'Stalemate'
}

class ProcessLog {
	constructor() {
		this.db = new LogDB()
	}

	newLog(log, steam3ID) {
		return new Promise(resolve => {
			let winner = Winner.red
			const redScore = log.teams.Red.score
			const blueScore = log.teams.Blue.score
			if(blueScore > redScore){
				winner = Winner.blue
			}
			if(blueScore === redScore){
				winner = Winner.stalemate
			}

			for (let [steamID, player] of Object.entries(log.players)) {
				this.db.addPlayer(steamID, log.info)
					.then(() => {
						this.db.appendPlayerEntry(steamID, player, winner)
					})
					.then(db => {
						this.db.preCalcValues(steamID, log)
					})
			}
			for (let killStreak of log.killstreaks) {
				this.db.addKillStreaksEntry(killStreak.steamid, killStreak)

			}

			resolve({db: this.db.getDB(), player: this.db.getPlayer(steam3ID)})

		})
	}
}

export default ProcessLog
