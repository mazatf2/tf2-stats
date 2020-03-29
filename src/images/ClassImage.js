import React, {Component} from 'react'
import classList from './classes/classlist.json'

class ClassImage extends Component {
	render() {
		const gameClass = this.props.class
		if (!gameClass) {
			return
		}
		if (!classList[gameClass]) {
			return
		}

		const url = process.env.PUBLIC_URL + '/classes/' + classList[gameClass]
		return (
			<img src={url} className='class-image' alt=''/>
		)
	}
}

export default ClassImage
