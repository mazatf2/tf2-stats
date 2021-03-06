import React, {Component} from 'react'
import {dataDecimals, dataPercentage, max, sum} from '../utils'
// import '../css/Table.css'
import {GridCell} from '@rmwc/grid'

class CombatPanel extends Component {
	render() {
		let player = this.props.player
		if (!player) {
			return (<div>working...</div>)
		}

		const kills = sum(player.kills)
		const deaths = sum(player.deaths)
		const kdr = (sum(player.kpd) / player.kpd.length).toFixed(dataDecimals)
		const streak = max(player.lks)//max(player.killstreaks.streak)
		const accuracy = (player.avgAccuracy || 0).toFixed(dataPercentage) * 100

		let playTimeS = 0
		for (let pClass of Object.values(player.class_stats)) {
			playTimeS += sum(pClass.total_time)
		}
		const killsPerMin = (playTimeS / 60 / kills).toFixed(dataDecimals)
		const killsPerGame = (kills / player.kills.length).toFixed(dataDecimals)

		const deathsPerMin = (playTimeS / 60 / deaths).toFixed(dataDecimals)
		const deathsPerGame = (deaths / player.deaths.length).toFixed(dataDecimals)

		return (
			<GridCell className='center-hack'>
				<table>
					<thead>
					<tr>
						<th className='table-header'>Combat</th>
					</tr>
					</thead>
					<tbody>
					<tr>
						<th>Accuracy</th>
						<td>{accuracy} %</td>
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
					{/*<tr>
						<th>Streak</th>
						<td></td>
					</tr>*/}
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
			</GridCell>
		)
	}
}

export default CombatPanel
