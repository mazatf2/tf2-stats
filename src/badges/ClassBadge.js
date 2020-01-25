import React from 'react'
import './ClassBadge.css'
import {sum} from '../utils'

class ClassBadge extends React.Component {
	render() {
		const showClass = this.props.showClass


		const player = this.props.player
		if (!player) {
			return (<div>working...</div>)

		}
		const data = player.class_stats[showClass]

		const time = sum(data.total_time)/60
		const kills = sum(data.kills)
		const assists = sum(data.assists)
		const deaths = sum(data.deaths)
		const kdr = kills/deaths + ''
		const badgeImg = <img/>

		return (
			<div>
				{showClass}
				<ul className='ClassBadge'>
					<li>{time}</li>
					<li>{kills}</li>
					<li>{deaths}</li>
					<li>{kdr}</li>
					<li>{badgeImg}</li>
				</ul>
			</div>
		)
	}
}

export default ClassBadge
