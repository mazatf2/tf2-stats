import React, {Component} from 'react'
import SchemaItem from '../steam_api/SchemaItem'
import WeaponLognames from './weapon_lognames_def.json'

class WeaponImage extends Component {
	render() {
		const name = this.props.name
		if(!name){
			return ''
		}
		const url = WeaponLognames[name].image_url

		return (
			<SchemaItem url={url}/>
		)
	}
}

export default WeaponImage
