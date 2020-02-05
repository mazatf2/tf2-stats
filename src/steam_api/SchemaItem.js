import React, {Component} from 'react'
import schema1 from './GetSchemaItems'
import schema2 from './GetSchemaItemsStart1150.json'
import schema3 from './GetSchemaItemsStart8266.json'
import schema4 from './GetSchemaItemsStart9299.json'
import schema5 from './GetSchemaItemsStart10301.json'
import schema6 from './GetSchemaItemsStart11320.json'
import schema7 from './GetSchemaItemsStart30748.json'

const schemas = [
	schema1, schema2, schema3, schema4, schema5, schema6, schema7
]

const find = (name) => {
	for (let schema of schemas) {
		const item = schema.result.items.find(obj => obj.name === name)
		if (item) return item
	}
}

class SchemaItem extends Component {
	render() {
		const name = this.props.name //item_class
		let url = this.props.url || ''
		let item = ''
		let src = ''

		if (name) {
			item = find(name)
			src = item.image_url
		}
		if (url) {
			src = url
		}

		return (
			<img alt='' src={src}></img>
		)
	}
}

export default SchemaItem
