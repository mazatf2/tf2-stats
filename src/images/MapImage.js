import React, {Component} from 'react'
import processMap from './maps/cp_process_final.png'

class MapImage extends Component {
	render() {
		let img = processMap
		//const gameMap = this.props.map

		return (
			<img src={img} alt=''/>
		)
	}
}

export default MapImage
