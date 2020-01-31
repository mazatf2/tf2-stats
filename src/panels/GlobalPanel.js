import React, {Component} from 'react'
import {sum} from '../utils'

class GlobalPanel extends Component {
	render() {
		let player = this.props.player
		if (!player) {
			return (<div>working...</div>)
		}
		//https://wiki.teamfortress.com/wiki/Scoreboard#Points
		const score = sum(player.kills) + (sum(player.assists) / 2) + sum(player.cpc) //FIXME

		return (
			<div>
				<table>
					<thead>
					<tr>
						<th className='table-header'>Global</th>
					</tr>
					</thead>
					<tbody>
					<tr>
						<th>Score</th>
						<td>{score}</td>
					</tr>
					</tbody>
				</table>
			</div>
		)
	}
}

export default GlobalPanel
