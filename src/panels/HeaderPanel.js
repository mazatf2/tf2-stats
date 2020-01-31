import React, {Component} from 'react'
import './HeaderPanel.css'
import SchemaItem from '../steam_api/SchemaItem'
import ClassImage from '../images/ClassImage'
import MapImage from '../images/MapImage'
import {dataDecimals, sum} from '../utils'

class HeaderPanel extends Component {
	render() {
		const player = this.props.player
		if (!player) {
			return (<div>working...</div>)
		}

		const mostPlayedClass = player.mostPlayedClass
		const mostPlayedMap = player.mostPlayedMap

		const kdr = (sum(player.kpd)/player.kpd.length).toFixed(dataDecimals)
		const kills = sum(player.kills)

		const wins = player.wins
		const loses = player.loses || 1
		const wlr = (wins / loses || 1).toFixed(dataDecimals)

		return (
			<div className='Header-Panel'>
				<div>rank</div>
				<div className='Header-Panel-Info'>
					<p>
						K/D<br/>{kdr}<br/>{kills} Kills
					</p>
					<p>
						W/L<br/>{wlr}<br/>{wins} Wins
					</p>
					<p>Time</p>
					<p>Accuracy</p>
				</div>
				<div className='Header-Panel-Images'>
					<ClassImage class={mostPlayedClass}/>
					<SchemaItem name='TF_WEAPON_ROCKETLAUNCHER'/>
					<MapImage map={mostPlayedMap}/>
				</div>
			</div>
		)
	}
}

export default HeaderPanel
