import React, {Component} from 'react'
import {dataDecimals, max, sum} from './utils'


class CombatPanel extends Component {
	render() {
		let player = this.props.player
		if (!player) {
			return (<div>working...</div>)
		}

		const kills = sum(player.kills)
		const deaths = sum(player.deaths)
		const kdr = (kills / deaths).toFixed(dataDecimals) //player.kpd
		const streak = max(player.lks)//max(player.killstreaks.streak)

		let playTimeS = 0
		for (let pClass of Object.values(player.class_stats)) {
			playTimeS += sum(pClass.total_time)
		}
		const killsPerMin = (playTimeS / 60 / kills).toFixed(dataDecimals)
		const killsPerGame = kills / player.kills.length

		const deathsPerMin = (playTimeS / 60 / deaths).toFixed(dataDecimals)
		const deathsPerGame = deaths / player.deaths.length

		return (
			<div>
				<table>
					<thead>
					<tr>
						<th>Combat</th>
					</tr>
					</thead>
					<tbody>
					<tr>
						<th>accu</th>
						<td>3%</td>
					</tr>
					<tr>
						<th>KD / Ratio</th>
						<td>{kdr}</td>
					</tr>
					<tr>
						<th>Kills</th>
					</tr>
					<tr>
						<th>Total</th>
						<td>{kills}</td>
					</tr>
					<tr>
						<th>Streak</th>
						<td>{streak}</td>
					</tr>
					<tr>
						<th>per minute</th>
						<td>{killsPerMin}</td>
					</tr>
					<tr>
						<th>per game</th>
						<td>{killsPerGame}</td>
					</tr>
					<tr>
						<th>Deaths</th>
					</tr>
					<tr>
						<th>Total</th>
						<td>{deaths}</td>
					</tr>
					<tr>
						<th>Streak</th>
						<td></td>
					</tr>
					<tr>
						<th>per minute</th>
						<td>{deathsPerMin}</td>
					</tr>
					<tr>
						<th>per game</th>
						<td>{deathsPerGame}</td>
					</tr>
					</tbody>

				</table>
				<p>
					Total<br/>
					Kills: {sum(player.kills)}<br/>
					Deaths: {sum(player.deaths)}
				</p>
			</div>
		)
	}
}

export default CombatPanel
