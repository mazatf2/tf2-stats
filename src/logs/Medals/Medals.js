export class Medals {
	constructor(db) {
		this.db = db
	}

	awardMedals() {
		this.db.getDB().then(db => {
			const players = db.players
		})
	}
}
