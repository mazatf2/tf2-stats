import React from 'react'
import logo from '../logo.svg'
import './App.css'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import StatsPage from './StatsPage'
import TestsPage from './TestsPage'
import {TopAppBar, TopAppBarFixedAdjust, TopAppBarRow, TopAppBarSection, TopAppBarTitle} from '@rmwc/top-app-bar'

import '@material/theme/dist/mdc.theme.css'
import '@material/top-app-bar/dist/mdc.top-app-bar.css'
import '@material/layout-grid/dist/mdc.layout-grid.css'
import '@material/list/dist/mdc.list.css'

function App() {
	return (
		<div className='App'>
			<Router>
				<TopAppBar>
					<TopAppBarRow>
						<TopAppBarSection>
							<img src={logo} className='App-logo' alt='logo'/>
							<TopAppBarTitle>TF2 Player Stats</TopAppBarTitle>
						</TopAppBarSection>
						<TopAppBarSection alignEnd>
							<Link to='/'>front page</Link>
							<Link to='/test'>tests</Link>
							<Link to='/profile/76561198075543642'>test profile</Link>
						</TopAppBarSection>
					</TopAppBarRow>
				</TopAppBar>
				<TopAppBarFixedAdjust/>
				<Switch>
					<Route path='/test' component={TestsPage}/>
					<Route path='/profile/:id(\d{17})' component={StatsPage}/>
				</Switch>
			</Router>
		</div>
	)
}

export default App
