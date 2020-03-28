import React, {Component} from 'react'
import medalsDef from '../logDB/Medals/Medals_def'
import MedalImage from '../images/MedalImage'
import {Grid, GridCell} from '@rmwc/grid'

class MedalsPanel extends Component {
	render() {
		let player = this.props.player
		if (!player) {
			return (<div>working...</div>)
		}

		return (
			<Grid>
				{Object.entries(medalsDef).map(([key, value]) => {
					const amountGet = player.medals[key] || 0
					const isDisabled = amountGet < 1

					let txt = ``
					if (!isDisabled) {
						txt = `${amountGet}x ${value.name}`
					}

					return (
						<GridCell key={key}>
							<MedalImage name={key} isDisabled={isDisabled}/><br/>
							{txt}
						</GridCell>
					)
				})}
			</Grid>
		)
	}
}

export default MedalsPanel
