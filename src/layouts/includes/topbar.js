import {TopAppBar, TopAppBarFixedAdjust, TopAppBarRow, TopAppBarSection, TopAppBarTitle} from '@rmwc/top-app-bar'
import Link from 'next/link'

export const TopBar = () => {
	return (
		<div>
			<TopAppBar>
				<TopAppBarRow>
					<TopAppBarSection>
						<img src="logo.svg" className="App-logo" alt="logo"/>
						<TopAppBarTitle>TF2 Player Stats</TopAppBarTitle>
					</TopAppBarSection>
					<TopAppBarSection alignEnd>
						<Link href="/">
							<a>Front page</a>
						</Link>
						<Link href="/test">
							<a>tests</a>
						</Link>
						<Link href="/profile/76561198075543642">
							<a>test profile</a>
						</Link>
					</TopAppBarSection>
				</TopAppBarRow>
			</TopAppBar>
			<TopAppBarFixedAdjust/>
		</div>
	)
}