import React, {Component} from 'react'
import {sum} from '../utils'
import {GridCell} from '@rmwc/grid'

class GlobalPanel extends Component {
	render() {
		let player = this.props.player
		if (!player) {
			return (<div>working...</div>)
		}
		const score = player.score

		return (
			<GridCell>
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
			</GridCell>
		)
	}
}

export default GlobalPanel
