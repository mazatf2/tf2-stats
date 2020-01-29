import React, {Component} from 'react'
import {dataDecimals, max, sum} from '../utils'
import '../css/Table.css'

class CombatPanel extends Component {
	render() {
		let player = this.props.player
		if (!player) {
			return (<div>working...</div>)
		}

		const kills = sum(player.kills)
		const deaths = sum(player.deaths)
		const kdr =  Number(player.kpd).toFixed(dataDecimals)
		const streak = max(player.lks)//max(player.killstreaks.streak)

		let playTimeS = 0
		for (let pClass of Object.values(player.class_stats)) {
			playTimeS += sum(pClass.total_time)
		}
		const killsPerMin = (playTimeS / 60 / kills).toFixed(dataDecimals)
		const killsPerGame = (kills / player.kills.length).toFixed(dataDecimals)

		const deathsPerMin = (playTimeS / 60 / deaths).toFixed(dataDecimals)
		const deathsPerGame = (deaths / player.deaths.length).toFixed(dataDecimals)

		return (
			<div>
				<table>
					<thead>
					<tr>
						<th className='table-header'>Combat</th>
					</tr>
					</thead>
					<tbody>
					<tr>
						<th>Accuracy</th>
						<td>3%</td>
					</tr>
					<tr>
						<th>K/D ratio</th>
						<td>{kdr}</td>
					</tr>
					<tr>
						<th className='table-header'>Kills</th>
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
						<th className='table-header'>Deaths</th>
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
			</div>
		)
	}
}

export default CombatPanel
