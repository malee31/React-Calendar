import { Provider } from 'react-redux';
import ReduxStore from './ReduxStore.js';
import IncludeNavbar from "./Components/IncludeNavbar";
import Calendar from "./Components/Calendar";
import './styles/App.css';

function App() {
	return (
		<Provider store={ReduxStore}>
			<div className="App">
				<IncludeNavbar>
					<Calendar/>
				</IncludeNavbar>
			</div>
		</Provider>
	);
}

export default App;
