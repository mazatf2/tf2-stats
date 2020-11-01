import React, {Component} from 'react'
import SchemaItem from '../steam_api/SchemaItem'
import WeaponLognames from './weapon_lognames_def'

class WeaponImage extends Component {
	render() {
		const name = this.props.name
		if (!name) {
			throw name
		}
		let entry = WeaponLognames[name]
		if (!entry) {
			return name
		}
		const url = WeaponLognames[name].image_url

		return (
			<SchemaItem url={url}/>
		)
	}
}

export default WeaponImage
