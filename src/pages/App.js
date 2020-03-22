import React from 'react'
import logo from '../logo.svg'
import './App.css'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import StatsPage from './StatsPage'
import TestsPage from './TestsPage'

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo'/>
			</header>
			<Router>
				<div  className={'App-body'}>
				<p>
					<Link to='/'>front page</Link></p>
				<p>
					<Link to='/test'>tests</Link>
				</p>
				<p>
					<Link to='/profile/76561198075543642'>test profile</Link>
				</p>
				<Route path='/test' component={TestsPage}/>
				<Route path='/profile/:id(\d{17})' component={StatsPage}/>
				</div>
			</Router>
		</div>
	)
}

export default App
