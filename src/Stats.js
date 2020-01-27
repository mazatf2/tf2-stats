import React, {Component} from 'react'
import FetchLog from './logs/FetchLog'
import ProcessLog from './logs/ProcessLog'

import test1 from './data/test1.json'
import test2 from './data/test2.json'
import CombatPanel from './CombatPanel'
import ClassBadge from './badges/ClassBadge'
import {DB} from './logs/LogDB'
import './css/Grid.css'

class Stats extends Component {
	state = {
		db: DB,
		player: null,
		steam3ID: '[U:1:135100113]'//'[U:1:115277914]'
	}

	componentDidMount() {
		console.log('mount')
		let id = this.props.match.params.id
		let steam3ID = this.state.steam3ID


		//this.setState((prevState, props) => ({
		//	steamID: id
		//}))

		//ProcessLog.new(test1)
		const processLog = new ProcessLog()
		//processLog.newLog(test1, steam3ID)

		processLog.newLog(test1, steam3ID)
			.then(newDBData => {
				newDBData.db.then(db =>
					this.setState({db: db})
				)
				newDBData.player.then(player => {
					console.log(player)
					this.setState({player: player})
				})


			})
		console.log(test1)
		console.log(this.state.db)

		window.processLog = processLog
	}

	render() {
		const steamID = this.state.steam3ID
		const player = this.state.player

		return (
			<div>
				stats {steamID} aaaaa
				<CombatPanel player={player} db={this.state.db}/>

				<div className='grid'>


				<ClassBadge showClass='scout' player={player} steamID={steamID}/>
				<ClassBadge showClass='soldier' player={player} steamID={steamID}/>
				<ClassBadge showClass='pyro' player={player} steamID={steamID}/>

				<ClassBadge showClass='demoman' player={player} steamID={steamID}/>
				<ClassBadge showClass='heavyweapons' player={player} steamID={steamID}/>
				<ClassBadge showClass='engineer' player={player} steamID={steamID}/>

				<ClassBadge showClass='medic' player={player} steamID={steamID}/>
				<ClassBadge showClass='sniper' player={player} steamID={steamID}/>
				<ClassBadge showClass='spy' player={player} steamID={steamID}/>
			</div>
			</div>
		)
	}
}

export default Stats
