import {Grid, GridCell} from '@rmwc/grid'
import {List, ListItem} from '@rmwc/list'
import Link from 'next/link'
import SteamID from 'steamid'
import Base from '../../layouts/base'
import data1 from '../../test_data/test1'
import data2 from '../../test_data/test2'
import data3 from '../../test_data/2426192.json'
import data4 from '../../test_data/2426167.json'

export default function Test({players}) {
	return (
		<Base title="">
			<Grid align="left">
				<GridCell>
				</GridCell>
				<GridCell align="middle">
					<List>
						{Object.entries(players).map(([id, player]) => {
								const steamID64 = new SteamID(id).getSteamID64()
								return (
									<ListItem key={steamID64} className='center-hack'>
										<Link as={`/profile/${id}`} href="/profile/[id]">
											<a>{player} {id}</a>
										</Link>
									</ListItem>
								)
							}
						)}
					</List>
				</GridCell>
			</Grid>
		</Base>
	)
}

export async function getStaticProps() {
	const players = [data1.names, data2.names, data3.names, data4.names]

	let names = {}
	for (let i of players) {
		let result = {...names, ...i}
		names = result
	}

	return {props: {players: names}}
}