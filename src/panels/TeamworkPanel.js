import React, {Component} from 'react'
import {sum} from '../utils'

class TeamworkPanel extends Component {
	render() {
		let player = this.props.player
		if (!player) {
			return (<div>working...</div>)
		}
		const wins = player.wins
		const loses = player.loses
		const stalemates = player.stalemates
		const captures = sum(player.cpc) //capture points capped
		const ubers = sum(player.ubers)

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
						<td>{wins}</td>
					</tr>
					<tr>
						<th>Loses</th>
						<td>{loses}</td>
					</tr>
					<tr>
						<th>Stalemates</th>
						<td>{stalemates}</td>
					</tr>
					<tr>
						<th>Captures</th>
						<td>{captures}</td>
					</tr>
					<tr>
						<th className='table-header'>Other</th>
					</tr>
					<tr>
						<th>Über Charges</th>
						<td>{ubers}</td>
					</tr>
					</tbody>
				</table>
			</div>
		)
	}
}

export default TeamworkPanel
