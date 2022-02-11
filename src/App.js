import { Provider } from 'react-redux';
import ReduxStore from './ReduxStore.js';
import Calendar from "./Components/Calendar";
import './styles/App.css';

function App() {
	return (
		<Provider store={ReduxStore}>
			<div className="App">
				<main>
					<Calendar/>
				</main>
			</div>
		</Provider>
	);
}

export default App;
