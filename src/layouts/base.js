import Head from 'next/head'
import {TopBar} from './includes/topbar'
import {Meta} from './includes/meta'

export default function Base
	({
		 children,
		 title = '',
	 }) {
	return (
		<div className="App">
			<Head>
				<title>{title}</title>
			</Head>
			<Meta/>
			<header>
				<TopBar/>
			</header>
			<main>
				{children}
			</main>
			<footer></footer>
		</div>
	)
}