import {Theme} from '@rmwc/theme'
import '@material/top-app-bar/dist/mdc.top-app-bar.min.css'
import '@material/theme/dist/mdc.theme.min.css'
import '@material/layout-grid/dist/mdc.layout-grid.min.css'
import '@material/list/dist/mdc.list.min.css'
import './index.css'
import './_app.css'
import '../panels/ClassBadge.css'
import '../panels/HeaderPanel.css'
import '../panels/HeaderPanel.css'
import '../images/MedalImage.css'
import '../css/Grid.css'
import '../css/Table.css'

export default function MyApp({Component, pageProps}) {
	return <Component {...pageProps} />
}