import React, {Component} from 'react'
import medalsDef from '../logDB/Medals/Medals_def'
import MedalImage from '../images/MedalImage'
import {GridCell} from '@rmwc/grid'

class MedalsPanel extends Component {
	render() {
		let player = this.props.player
		if (!player) {
			return (<div>working...</div>)
		}

		return (
			<GridCell>
				{Object.entries(medalsDef).map(([key, value]) => {
					const amountGet = player.medals[key] || 0
					const isDisabled = amountGet < 1

					let txt = ``
					if (!isDisabled) {
						txt = `${amountGet}x ${value.name}`
					}

					return (
						<div key={key}>
							<MedalImage name={key} isDisabled={isDisabled}/>
							{txt}
						</div>
					)
				})}
			</GridCell>
		)
	}
}

export default MedalsPanel
