import React, {Component} from 'react'
import soldier from './classes/soldier.png'

class ClassImage extends Component {
	render() {
		let img
		const gameClass = this.props.class
		if(gameClass === 'soldier'){
			img = soldier
		} else {
			img = soldier
		}
		return (
			<img src={img} alt=''/>
		)
	}
}

export default ClassImage
