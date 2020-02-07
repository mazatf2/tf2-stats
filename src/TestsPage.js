import React, {Component} from 'react'
import SteamID from 'steamid'
import data1 from './data/test1'
import data2 from './data/test2'
import data3 from './data/2426192.json'
import data4 from './data/2426167.json'
import {Link} from 'react-router-dom'

const data = [data1.names, data2.names, data3.names, data4.names]

class TestsPage extends Component {
	state = {players: {}}

	componentDidMount() {
		let names = {}
		for (let i of data) {
			let result = {...names, ...i}
			names = result
		}
		this.setState({players: names})
	}

	render() {
		const players = this.state.players
		return (
			<div>
				dataset length: {data.length || 0} logs
				<ul>
					{Object.entries(players).map(([id, player]) => {
							const steamID64 = new SteamID(id).getSteamID64()
							return (
								<li key={steamID64}>
									<Link to={`profile/${steamID64}`}>{player} {id}</Link>
								</li>
							)
						}
					)}
				</ul>
			</div>
		)
	}
}

export default TestsPage
