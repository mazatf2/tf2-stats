import React, {Component} from 'react'

class TeamworkPanel extends Component {
	render() {
		let player = this.props.player
		if (!player) {
			return (<div>working...</div>)
		}

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
