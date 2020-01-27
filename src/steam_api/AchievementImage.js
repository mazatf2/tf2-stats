import React, {Component} from 'react'
import schema from './GetSchemaForGame'

class AchievementImage extends Component {
	render() {
		const name = this.props.name
		const version = this.props.version //bool
		const achievement = schema.game.availableGameStats.achievements.find(obj => obj.name === name)
		let iconType = 'icon'

		if(!version){
			iconType = 'icongray'
		}
		const src = achievement[iconType]

		return (
			<div>
				<img alt='' src={src}></img>
			</div>
		)
	}
}

export default AchievementImage
