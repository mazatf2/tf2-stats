import React, {Component} from 'react'
import {dataDecimals, max, sum} from '../utils'

class TeamworkPanel extends Component {
	render() {
		let player = this.props.player
		if (!player) {
			return (<div>working...</div>)
		}

		const kills = sum(player.kills)
		const deaths = sum(player.deaths)
		const kdr = Number(player.kpd).toFixed(dataDecimals)
		const streak = max(player.lks)//max(player.killstreaks.streak)

		return (
			<div>
				<table>
					<thead>
					<tr>
						<th className='table-header'>Teamwork</th>
					</tr>
					</thead>
					<tbody>
					<tr>
						<th>Wins</th>
						<td></td>
					</tr>
					<tr>
						<th>Loses</th>
						<td></td>
					</tr>
					</tbody>
				</table>
			</div>
		)
	}
}

export default TeamworkPanel
