import React, {Component} from 'react'
import SteamID from 'steamid'
import data1 from '../test_data/test1'
import data2 from '../test_data/test2'
import data3 from '../test_data/2426192.json'
import data4 from '../test_data/2426167.json'
import {Link} from 'react-router-dom'
import {List, ListItem} from '@rmwc/list'
import {Grid, GridCell} from '@rmwc/grid'

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
			<Grid align='left'>
				<GridCell>
				</GridCell>
				<GridCell align='middle'>
					dataset length: {data.length || 0} logs
					<List>
						{Object.entries(players).map(([id, player]) => {
								const steamID64 = new SteamID(id).getSteamID64()
								return (
									<ListItem key={steamID64} className='center-hack'>
										<Link to={`profile/${steamID64}`}>{player} {id}</Link>
									</ListItem>
								)
							}
						)}
					</List>
				</GridCell>
			</Grid>
		)
	}
}

export default TestsPage
