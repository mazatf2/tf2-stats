import React, {Component} from 'react'
import './MedalImage.css'
import medalsDef from '../logDB/Medals/Medals_def'

class MedalImage extends Component {
	render() {
		const name = this.props.name
		if (!name) {
			throw name
		}
		const medalBase = medalsDef[name]
		const src = process.env.PUBLIC_URL + '/medals/' + medalsDef[name].src
		const isDisabled = this.props.isDisabled

		let css = ''
		if (isDisabled) css = 'disabled'

		return (
			<img src={src} className={css} alt={medalBase.name}>
			</img>
		)
	}
}

export default MedalImage
