import React, {Component} from 'react'
import mapList from './maps/maplist.json'

class MapImage extends Component {
	render() {
		const map = this.props.map
		if (!map) {
			return
		}
		if (!mapList[map]) {
			return
		}
		const url = process.env.PUBLIC_URL + '/maps/' + mapList[map]

		return (
			<img src={url} className='map-image' alt=''/>
		)
	}
}

export default MapImage
