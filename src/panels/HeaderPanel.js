import React, {Component} from 'react'
// import './HeaderPanel.css'
import ClassImage from '../images/ClassImage'
import MapImage from '../images/MapImage'
import {dataDecimals, dataPercentage, sum} from '../utils'
import WeaponImage from '../images/WeaponImage'
import {Grid, GridCell} from '@rmwc/grid'

class HeaderPanel extends Component {
	render() {
		const player = this.props.player
		if (!player) {
			return (<div>working...</div>)
		}

		const mostPlayedClass = player.mostPlayedClass
		const mostPlayedMap = player.mostPlayedMap
		const mostUsedWeapon = player.mostUsedWeapon

		const kdr = (sum(player.kpd) / player.kpd.length).toFixed(dataDecimals)
		const kills = sum(player.kills)

		const wins = player.wins
		const loses = player.loses || 1
		const wlr = (wins / loses || 1).toFixed(dataDecimals)

		const accuracy = (player.avgAccuracy || 0 ).toFixed(dataPercentage) * 100

		return (
			<Grid>
				<GridCell>rank</GridCell>
				<GridCell className='Header-Panel-Info'>
					<p>
						K/D<br/>{kdr}<br/>{kills} Kills
					</p>
					<p>
						W/L<br/>{wlr}<br/>{wins} Wins
					</p>
					<p>Time</p>
					<p>Accuracy<br/>{accuracy} %</p>
				</GridCell>
				<GridCell className='Header-Panel-Images'>
					<ClassImage class={mostPlayedClass}/>
					<WeaponImage name={mostUsedWeapon}/>
					<MapImage map={mostPlayedMap}/>
				</GridCell>
			</Grid>
		)
	}
}

export default HeaderPanel
