import { Provider } from 'react-redux';
import ReduxStore from './ReduxStore.js';
import IncludeNavbar from "./Components/IncludeNavbar";
import './styles/App.css';

function App() {
	return (
		<Provider store={ReduxStore}>
			<div className="App">
				<IncludeNavbar>
					<header className="App-header">
						React Calendar
					</header>
				</IncludeNavbar>
			</div>
		</Provider>
	);
}

export default App;
