import React, {Component} from 'react'
import './HeaderPanel.css'
import SchemaItem from '../steam_api/SchemaItem'
import ClassImage from '../images/ClassImage'
import MapImage from '../images/MapImage'

class HeaderPanel extends Component {
	render() {
		const player = this.props.player
		if(!player){
			return (<div>working...</div>)
		}

		const mostPlayedClass = player.mostPlayedClass
		const mostPlayedMap = player.mostPlayedMap

		return (
			<div className='Header-Panel'>
				<div>rank</div>
				<div>info</div>
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
