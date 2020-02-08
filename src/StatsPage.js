import React, {Component} from 'react'
import ProcessLog from './logs/ProcessLog'

import test1 from './data/test1.json'
import test2 from './data/test2.json'
import test3 from './data/2426167.json'
import test4 from './data/2426192.json'
import CombatPanel from './panels/CombatPanel'
import ClassBadge from './badges/ClassBadge'
import './css/Grid.css'
import HeaderPanel from './panels/HeaderPanel'
import * as SteamID from 'steamid'
import TeamworkPanel from './panels/TeamworkPanel'
import GlobalPanel from './panels/GlobalPanel'
import TopWeaponsPanel from './panels/TopWeaponsPanel'

class StatsPage extends Component {
	state = {
		db: null,
		player: null,
		steam3ID: '[U:1:135100113]'//'[U:1:115277914]'
	}

	componentDidMount() {
		console.log('mount')
		let id = this.props.match.params.id
		let steam3ID = new SteamID(id).getSteam3RenderedID()
		this.setState({steam3ID: steam3ID})

		const testData = async ()=>{
			const processLog = new ProcessLog()
			await processLog.newLog(test1, steam3ID)
			await processLog.newLog(test2, steam3ID)
			await processLog.newLog(test3, steam3ID)
			const result = await processLog.newLog(test4, steam3ID)
			result.db.then((db)=>{
				this.setState({db: db})
			})
			result.player.then((player)=>{
				this.setState({player: player})
			})

		}
		testData()
	}

	render() {
		const steamID = this.state.steam3ID
		const player = this.state.player

		return (
			<div>
				stats {steamID}
				<HeaderPanel player={player}/>
				<div className='grid'>
					<GlobalPanel player={player}/>
					<TeamworkPanel player={player}/>
					<CombatPanel player={player}/>
				</div>
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
				<TopWeaponsPanel player={player}/>
			</div>
		)
	}
}

export default StatsPage
