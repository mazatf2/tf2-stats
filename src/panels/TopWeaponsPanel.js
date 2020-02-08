import React, {Component} from 'react'
import WeaponImage from '../images/WeaponImage'
import {dataPercentage, localizedWeapon} from '../utils'

class TopWeaponsPanel extends Component {
	render() {
		let player = this.props.player
		if (!player) {
			return (<div>working...</div>)
		}
		const topWeapons = Object.entries(player.topWeapons)

		return (
			<table>
				<tbody>
				{topWeapons.map(([name, weapon]) => {
					console.log(name, weapon)
					return (
						<tr key={name}>
							<th><WeaponImage name={name}/></th>
							<th>{localizedWeapon(name)}</th>
							<th>{weapon.killCount}</th>
							<th>{weapon.avgAccuracy.toFixed(dataPercentage) * 100} %</th>
						</tr>
					)
				})}
				</tbody>
			</table>
		)
	}
}

export default TopWeaponsPanel
