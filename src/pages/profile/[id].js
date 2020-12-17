import {useRouter} from 'next/router'
import {Grid, GridCell} from '@rmwc/grid'
import Base from '../../layouts/base'
import HeaderPanel from '../../panels/HeaderPanel'
import GlobalPanel from '../../panels/GlobalPanel'
import TeamworkPanel from '../../panels/TeamworkPanel'
import CombatPanel from '../../panels/CombatPanel'
import ClassBadge from '../../panels/ClassBadge'
import TopWeaponsPanel from '../../panels/TopWeaponsPanel'
import MedalsPanel from '../../panels/MedalsPanel'
import ProcessLog from '../../logDB/ProcessLog'
import test1 from '../../test_data/test1.json'
import test2 from '../../test_data/test2.json'
import test3 from '../../test_data/2426167.json'
import test4 from '../../test_data/2426192.json'

export default function Profile({player}) {
	const router = useRouter()
	const {id} = router.query
	const steamID = id

	return (
		<Base title="Stats">
			<Grid>
				<GridCell></GridCell>
				<GridCell align="middle">
					stats {steamID}
				</GridCell>
			</Grid>
			<HeaderPanel player={player}/>
			<Grid>
				<GlobalPanel player={player}/>
				<TeamworkPanel player={player}/>
				<CombatPanel player={player}/>
			</Grid>
			<Grid>
				<ClassBadge showClass="scout" player={player} steamID={steamID}/>
				<ClassBadge showClass="soldier" player={player} steamID={steamID}/>
				<ClassBadge showClass="pyro" player={player} steamID={steamID}/>

				<ClassBadge showClass="demoman" player={player} steamID={steamID}/>
				<ClassBadge showClass="heavyweapons" player={player} steamID={steamID}/>
				<ClassBadge showClass="engineer" player={player} steamID={steamID}/>

				<ClassBadge showClass="medic" player={player} steamID={steamID}/>
				<ClassBadge showClass="sniper" player={player} steamID={steamID}/>
				<ClassBadge showClass="spy" player={player} steamID={steamID}/>
			</Grid>
			<Grid>
				<TopWeaponsPanel player={player}/>
			</Grid>
			<MedalsPanel player={player}/>
		</Base>
	)
}

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: true,
	}
}

export async function getStaticProps() {

	const testData = async () => {
		const handle = new ProcessLog()
		const promises = [test1, test2, test3, test4]
			.map(async i => await handle.newLog(i, ''))

		return Promise.all(promises)
			.then(i => {
				return JSON.parse(JSON.stringify(Object.values(handle.db.DB.players)))
			})
	}

	const player = await testData()

	return {
		props: {player: player[0]},
	}
}