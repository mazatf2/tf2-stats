import {logApiRE} from './logApiRE'

//or moment(i).format('HH:mm');
function secondsToHms(d) {
	//https://stackoverflow.com/a/37096512
	d = Number(d)
	var h = Math.floor(d / 3600)
	var m = Math.floor(d % 3600 / 60)
	var s = Math.floor(d % 3600 % 60)

	var hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : ''
	var mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : ''
	var sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : ''
	return hDisplay + mDisplay + sDisplay
}

export class LogApi {
	constructor() {
		this.state = {rounds: []}
		this.eventId = 0
		this.events = {}
	}

	setState(obj) {
		Object.keys(obj).filter((i) => {
			this.state[i] = obj[i]
		})
	}

	doReExec(line, key) {
		let result = logApiRE[key].exec(line)
		result.groups['type'] = key

		let t = result.groups
		let time = new Date(`${t.year}-${t.month}-${t.day}T${t.hour}:${t.minute}:${t.second}Z`) //ISO8601
		result.groups['date_json'] = time.toJSON()

		return result
	}

	findMatch(line, key) {
		let test = logApiRE[key].test(line)

		if (test) {
			let result = this.doReExec(line, key)

			let tick_from_start, tick_from_tournament_start = null

			let log_file_started = (this.state.log_file_started || null)
			let tournament_mode_start = (this.state.tournament_mode_start || null)

			if (key === 'log_file_started') {
				console.info(key)
				console.info(result)
				log_file_started = result
				this.setState({log_file_started: result})
			}

			let time = new Date(result.groups.date_json)
			tick_from_start = (time - new Date(log_file_started.groups.date_json)) / 14.9999997

			if (key === 'tournament_mode_start') {
				tournament_mode_start = result
				this.setState({tournament_mode_start: result})
				this.setState({round_id: 1})
				this.setState({play_state: 'normal'})
			}
			if (key === 'round_start') {
				let newId = this.state.round_id += 1
				this.setState({round_id: newId})
				this.setState({play_state: 'normal'})
			}
			if (key === 'round_win' || key === 'round_stalemate') {
				this.setState({play_state: 'after_round'})
				this.state.rounds.push(result.groups)
			}
			if (key === 'round_length') {
				this.setState({round_length: result.groups.round_length})
			}
			if (key === 'score_current' || key === 'score_final') {
				if (result.groups.team === 'Red') {
					this.setState({round_score_red: result.groups.score})
				}
				if (result.groups.team === 'Blue') {
					this.setState({round_score_blue: result.groups.score})
				}
			}

			if (tournament_mode_start) {
				tick_from_tournament_start = (time - new Date(tournament_mode_start.groups.date_json)) / 14.9999997
			}

			result.groups['tick_from_start'] = tick_from_start
			result.groups['tick_from_tournament_start'] = tick_from_tournament_start
			result.groups['ellapsed_time_from_start'] = secondsToHms(tick_from_start / 66)
			result.groups['ellapsed_time_from_tournament_start'] = secondsToHms(tick_from_tournament_start / 66)

			result.groups['round_id'] = this.state.round_id || 0
			result.groups['round_score_red'] = this.state.round_score_red || 0
			result.groups['round_score_blue'] = this.state.round_score_blue || 0

			result.groups['play_state'] = this.state.play_state || 'pregame'

			return result
		}
		return false

	}

	addEvent(line) {
		line.id = this.eventId

		this.events[this.eventId] = line
		this.setState({'events': this.events})

		this.eventId += 1
	}

	parse(data) {
		data = data.split(/\r\n|\n/)

		console.info(data[0])
		console.info('findMatch', this)
		//for pugchamp and some tf2center logs
		//bug: some log lines doesn't always have date
		let log_file_started = this.findMatch(data[0], 'log_file_started')
		if (!log_file_started) {
			let firstLine = this.doReExec(data[0], 'dateRe')
			console.info(firstLine)
			this.setState({log_file_started: firstLine})
			console.info('log_file_started set to first line')

			this.setState({tournament_mode_start: firstLine}) //for pugchamp logs
			console.info('tournament_mode_start set to first line')

		}

		for (let line of data) {
			if (!line) console.info('!line: ', line)

			let tournament_mode_start = this.findMatch(line, 'tournament_mode_start')
			if (tournament_mode_start) {
				if (this.state.tournament_mode_start) console.info('tournament_mode_start already set') //pugchamp
				this.setState({tournament_mode_start: tournament_mode_start})
			}

			let log_file_started = this.findMatch(line, 'log_file_started')
			if (log_file_started) this.setState({log_file_started: log_file_started})

			let stuff = (this.findMatch(line, 'round_start')
				|| this.findMatch(line, 'round_win')
				|| this.findMatch(line, 'round_length')
				|| this.findMatch(line, 'round_stalemate')

				|| this.findMatch(line, 'score_current')
				|| this.findMatch(line, 'score_final')

				//|| this.findMatch(line, 'log_file_started')
				//|| this.findMatch(line, 'tournament_mode_start')
				|| this.findMatch(line, 'game_over')
			)

			if (stuff) {
				this.addEvent(stuff.groups)
			}

			let temp = (this.findMatch(line, 'damage_trigger') || this.findMatch(line, 'killed'))
			if (temp) {

				//"(damage "58") (realdamage "55") (weapon "scattergun")"
				if (temp.groups['trigger_attributes']) {
					const testRe = /(\w+) "([^"]+)"/g

					//["damage "111"", "realdamage "110"", "weapon "tf_projectile_rocket"", "healing "80"", "airshot "1""]
					let groups = temp.groups.trigger_attributes.match(testRe)

					for (let i of groups) {

						//testRe2 needs to stay here, because testRe.exec(i) won't work. maybe scope/compiler/babel/webpack/create-react-app BUG 2018
						//var testRe2 = /(\w+) "(\w+)"/g
						const testRe2 = /(\w+) "([^"]+)"/g
						let bug = testRe2.exec(i)

						let [input, key, value] = bug

						temp.groups[key] = value
					}

				}

				this.addEvent(temp.groups)

			}

		}

		console.info('LogApi.logFileDone')
		this.setState({logFileDone: true})

		return this.state
	}

}