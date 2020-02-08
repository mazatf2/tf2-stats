import React from 'react'
import './ClassBadge.css'
import {dataDecimals, localizedClass, sum, toFixed} from '../utils'
import SchemaAchievement from '../steam_api/SchemaAchievement'

class ClassBadge extends React.Component {
	constructor(props) {
		super(props)
		this.tableRef = React.createRef()
		this.isSidebarVisible = false
	}

	componentDidMount() {
		window.ref = this.tableRef
		console.log(this.tableRef)
		//	this.checkSidebar()
	}

	componentDidUpdate() {
		if (this.tableRef.current && !this.isSidebarVisible) {
			this.checkSidebar()
		}
	}

	state = {
		sidebar: false
	}

	checkSidebar() {
		if (this.tableRef.current) {
			let el = this.tableRef.current
			if (el.offsetLeft < 200) { //FIXME
				this.showSidebar()
			}
		}
	}

	showSidebar() {
		this.isSidebarVisible = true

		return new Promise(resolve => {
			this.setState({sidebar: 'yes'})

			let labels = this.tableRef.current.querySelectorAll('th')
			for (let el of labels) {
				el.classList.add('ClassBadge-show-labels')
			}

		})

	}

	render() {
		const showClass = this.props.showClass

		const player = this.props.player
		if (!player) {
			return (<div>working...</div>)

		}

		const data = player.class_stats[showClass]

		const classLabel = localizedClass[showClass]
		const time = Number(sum(data.total_time) / 60).toFixed(dataDecimals)
		const kills = sum(data.kills)
		const assists = sum(data.assists)
		const deaths = sum(data.deaths)
		const kdr = toFixed(kills / deaths)

		let achName = showClass.toUpperCase()
		if (achName === 'HEAVYWEAPONS') {
			achName = 'HEAVY'
		}
		let badgeName = `TF_${achName}_ACHIEVE_PROGRESS1`
		const badgeImg = <SchemaAchievement name={badgeName} version={time > 0.1}/>

		return (
			<div>
				<table className='ClassBadge' ref={this.tableRef}>
					<thead>
					<tr>
						<th className='table-header ClassBadge-show-labels'>{classLabel}</th>
					</tr>
					</thead>
					<tbody>
					<tr>
						<th>Time</th>
						<td>{time}</td>
					</tr>
					<tr>
						<th>Kills</th>
						<td>{kills}</td>
					</tr>
					<tr>
						<th>Assists</th>
						<td>{assists}</td>
					</tr>
					<tr>
						<th>Deaths</th>
						<td>{deaths}</td>
					</tr>
					<tr>
						<th>K/D ratio</th>
						<td>{kdr}</td>
					</tr>
					<tr>
						<th></th>
						<td>{badgeImg}</td>
					</tr>
					</tbody>
				</table>
			</div>
		)
	}
}

export default ClassBadge
