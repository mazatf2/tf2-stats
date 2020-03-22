const findMaxScore = (previousValue, currentValue, currentIndex, array) => {
	if (currentValue[1] > previousValue[1]) {
		currentValue[2] = currentIndex
		return currentValue
	} else {
		return previousValue
	}
}

export class Medals {
	constructor(db) {
		this.db = db
	}

	awardMedals(playerIDList) {
		return new Promise(resolve => {
			const players = {}
			playerIDList.forEach((i) => {
				players[i] = this.db.players[i]
			})

			let scores = Object.entries(players).map(([key, value]) => [key, value.currentMatchScore]) // [[id, score],]

			let gold = scores.reduce(findMaxScore, [0, 0]) // [id, score, index]
			scores.splice(gold[2], 1)

			let silver = scores.reduce(findMaxScore, [0, 0])
			scores.splice(silver[2], 1)

			let bronze = scores.reduce(findMaxScore, [0, 0])
			scores.splice(bronze[2], 1)

			this.db.players[gold[0]].medals.gold += 1
			this.db.players[silver[0]].medals.silver += 1
			this.db.players[bronze[0]].medals.bronze += 1

			resolve()
		})
	}
}
