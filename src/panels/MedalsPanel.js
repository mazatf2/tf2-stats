import React, {Component} from 'react'

class MedalsPanel extends Component {
	render() {
		let player = this.props.player
		if (!player) {
			return (<div>working...</div>)
		}

		return (
			<div>
				medals panel
			</div>
		)
	}
}

export default MedalsPanel
